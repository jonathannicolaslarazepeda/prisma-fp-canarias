import { Op } from "sequelize";
import { Survey } from "./survey.model.js";
import { SurveyQuestion } from "../survey-questions/survey-question.model.js";
import { SurveyInvitation } from "../survey-invitations/survey-invitation.model.js";
import { SurveyAnswer } from "../survey-answers/survey-answer.model.js";
import { Consent } from "../consents/consent.model.js";

const includeQuestions = {
  model: SurveyQuestion,
  as: "questions",
  attributes: ["id", "questionText", "questionType", "sortOrder", "isRequired"],
};

// Valor de Consent.status que indica consentimiento otorgado (confirmar con el módulo de consentimientos).
const ACTIVE_CONSENT_STATUS = "granted";

// Alumnado cuyo último registro de consentimiento está otorgado (HU-06).
async function findStudentIdsWithActiveConsent(): Promise<Set<number>> {
  const consents = await Consent.findAll({
    attributes: ["studentId", "status"],
    order: [["recordedAt", "ASC"], ["id", "ASC"]],
  });

  const latestStatus = new Map<number, string>();
  for (const consent of consents) {
    latestStatus.set(consent.studentId, consent.status);
  }

  const studentIds = new Set<number>();
  for (const [studentId, status] of latestStatus) {
    if (status === ACTIVE_CONSENT_STATUS) studentIds.add(studentId);
  }
  return studentIds;
}

export class SurveyService {

  static async findAll() {
    return Survey.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Survey.findByPk(id);
  }

  static async findAllEagerly() {
    return Survey.findAll({
      include: [includeQuestions],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return Survey.findByPk(id, {
      include: [includeQuestions],
    });
  }

  // HU-11: plantilla fija de encuesta (la activa más reciente), con las preguntas en orden.
  static async findActiveWithQuestions() {
    return Survey.findOne({
      where: { isActive: true },
      include: [{ ...includeQuestions, separate: true, order: [["sortOrder", "ASC"]] }],
      order: [["id", "DESC"]],
    });
  }

  // HU-11: resumen de respuestas con porcentajes por pregunta (solo alumnado con consentimiento activo).
  // El porcentaje de cada valor se calcula sobre las respuestas a esa pregunta. null si la encuesta no existe.
  static async getAnswerSummary(surveyId: number) {
    const survey = await Survey.findByPk(surveyId, { attributes: ["id", "title"] });
    if (!survey) return null;

    const questions = await SurveyQuestion.findAll({
      where: { surveyId },
      attributes: ["id", "questionText", "questionType"],
      order: [["sortOrder", "ASC"]],
    });

    const consentedStudents = await findStudentIdsWithActiveConsent();

    const invitations = await SurveyInvitation.findAll({
      where: { surveyId, completedAt: { [Op.ne]: null } },
      attributes: ["id", "studentId"],
    });
    const invitationIds = invitations
      .filter((invitation) => consentedStudents.has(invitation.studentId))
      .map((invitation) => invitation.id);

    const answers = await SurveyAnswer.findAll({
      where: { invitationId: invitationIds, answerValue: { [Op.ne]: null } },
      attributes: ["questionId", "answerValue"],
    });

    // questionId → (valor → número de respuestas)
    const countsByQuestion = new Map<number, Map<string, number>>();
    for (const answer of answers) {
      if (answer.answerValue === null) continue;
      const counts = countsByQuestion.get(answer.questionId) ?? new Map<string, number>();
      counts.set(answer.answerValue, (counts.get(answer.answerValue) ?? 0) + 1);
      countsByQuestion.set(answer.questionId, counts);
    }

    return {
      surveyId: survey.id,
      title: survey.title,
      respondents: invitationIds.length,
      questions: questions.map((question) => {
        const counts = countsByQuestion.get(question.id) ?? new Map<string, number>();
        const answered = [...counts.values()].reduce((sum, count) => sum + count, 0);

        return {
          id: question.id,
          questionText: question.questionText,
          questionType: question.questionType,
          answered,
          values: [...counts]
            .map(([value, count]) => ({
              value,
              count,
              percentage: Math.round((count / answered) * 1000) / 10,
            }))
            .sort((a, b) => b.count - a.count),
        };
      }),
    };
  }

  static async create(data: {
    title: string;
    description?: string | null;
    isActive?: boolean;
  }) {
    return Survey.create(data);
  }


  static async update(
    survey: Survey,
    data: {
      title?: string;
      description?: string | null;
      isActive?: boolean;
    }
  ) {
    return survey.update(data);
  }


  static async delete(survey: Survey) {
    await survey.destroy();
  }
}
