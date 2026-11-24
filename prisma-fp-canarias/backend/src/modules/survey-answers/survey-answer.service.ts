import { SurveyAnswer } from "./survey-answer.model.js";
import { SurveyInvitation } from "../survey-invitations/survey-invitation.model.js";
import { SurveyQuestion } from "../survey-questions/survey-question.model.js";

const includeInvitation = {
  model: SurveyInvitation,
  as: "invitation",
  attributes: ["id", "surveyId", "studentId", "completedAt"],
};

const includeQuestion = {
  model: SurveyQuestion,
  as: "question",
  attributes: ["id", "questionText", "questionType", "sortOrder"],
};

// answer_value es STRING (255 caracteres).
const MAX_ANSWER_LENGTH = 255;

type AnswerInput = {
  questionId: number;
  answerValue: string | null;
};

export class SurveyAnswerService {

  static async findAll() {
    return SurveyAnswer.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return SurveyAnswer.findByPk(id);
  }

  static async findAllEagerly() {
    return SurveyAnswer.findAll({
      include: [includeInvitation, includeQuestion],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return SurveyAnswer.findByPk(id, {
      include: [includeInvitation, includeQuestion],
    });
  }

  // HU-11: comprueba las respuestas enviadas desde el enlace. Devuelve el mensaje de error o null.
  static async validateAnswers(
    invitation: SurveyInvitation,
    answers: AnswerInput[]
  ): Promise<string | null> {
    if (!Array.isArray(answers)) {
      return "Las respuestas deben enviarse como una lista";
    }

    const questions = await SurveyQuestion.findAll({
      where: { surveyId: invitation.surveyId },
      attributes: ["id", "isRequired"],
    });
    const questionIds = new Set(questions.map((question) => question.id));

    const seen = new Set<number>();
    const answered = new Set<number>();
    for (const { questionId, answerValue } of answers) {
      if (!questionIds.has(questionId)) {
        return `La pregunta ${questionId} no pertenece a esta encuesta`;
      }
      if (seen.has(questionId)) {
        return `La pregunta ${questionId} está respondida más de una vez`;
      }
      seen.add(questionId);

      if (answerValue === null || answerValue === undefined) continue;
      if (typeof answerValue !== "string") {
        return `La respuesta a la pregunta ${questionId} debe ser texto`;
      }
      if (answerValue.length > MAX_ANSWER_LENGTH) {
        return `La respuesta a la pregunta ${questionId} supera los ${MAX_ANSWER_LENGTH} caracteres`;
      }
      if (answerValue.trim() !== "") answered.add(questionId);
    }

    const missing = questions
      .filter((question) => question.isRequired && !answered.has(question.id))
      .map((question) => question.id);
    if (missing.length > 0) {
      return `Faltan respuestas a preguntas obligatorias: ${missing.join(", ")}`;
    }
    return null;
  }

  // HU-11: guarda las respuestas (vinculadas al alumno a través de la invitación) y marca la invitación como completada.
  // Las preguntas opcionales sin respuesta no se guardan. null si la invitación ya estaba completada.
  static async submitAnswers(invitation: SurveyInvitation, answers: AnswerInput[]) {
    return SurveyAnswer.sequelize!.transaction(async (transaction) => {
      const answeredAt = new Date();

      // Solo se completa si nadie lo ha hecho antes: evita guardar dos veces el mismo envío.
      const [updatedRows] = await SurveyInvitation.update(
        { completedAt: answeredAt },
        { where: { id: invitation.id, completedAt: null }, transaction }
      );
      if (updatedRows === 0) return null;

      return SurveyAnswer.bulkCreate(
        answers
          .filter(({ answerValue }) => typeof answerValue === "string" && answerValue.trim() !== "")
          .map(({ questionId, answerValue }) => ({
            invitationId: invitation.id,
            questionId,
            answerValue: (answerValue as string).trim(),
            answeredAt,
          })),
        { transaction }
      );
    });
  }

  static async create(data: {
    invitationId: number;
    questionId: number;
    answerValue: string;
    answeredAt?: Date;
  }) {
    return SurveyAnswer.create(data);
  }


  static async update(
    surveyAnswer: SurveyAnswer,
    data: {
      invitationId?: number;
      questionId?: number;
      answerValue?: string;
      answeredAt?: Date;
    }
  ) {
    return surveyAnswer.update(data);
  }


  static async delete(surveyAnswer: SurveyAnswer) {
    await surveyAnswer.destroy();
  }
}
