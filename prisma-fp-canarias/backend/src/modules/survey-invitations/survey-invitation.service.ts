import { createHash, randomBytes } from "node:crypto";
import { Op } from "sequelize";
import { SurveyInvitation } from "./survey-invitation.model.js";
import { Survey } from "../surveys/survey.model.js";
import { SurveyAnswer } from "../survey-answers/survey-answer.model.js";
import { SurveyQuestion } from "../survey-questions/survey-question.model.js";
import { Student } from "../students/student.model.js";

const includeSurvey = {
  model: Survey,
  as: "survey",
  attributes: ["id", "title", "isActive"],
};

const includeAnswers = {
  model: SurveyAnswer,
  as: "answers",
  attributes: ["id", "questionId", "answerValue", "answeredAt"],
};

const DEFAULT_EXPIRATION_DAYS = 30;
const MS_PER_DAY = 86_400_000;

// En la base de datos solo se guarda el hash; el token en claro se devuelve una única vez al crear la invitación.
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export class SurveyInvitationService {

  static async findAll() {
    return SurveyInvitation.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return SurveyInvitation.findByPk(id);
  }

  static async findAllEagerly() {
    return SurveyInvitation.findAll({
      include: [includeSurvey, includeAnswers],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return SurveyInvitation.findByPk(id, {
      include: [includeSurvey, includeAnswers],
    });
  }

  // HU-11: un enlace único e intransferible por alumno.
  // Omite a quien ya tiene invitación para esta encuesta y los ids que no existen.
  static async createForStudents(
    survey: Survey,
    studentIds: number[],
    expiresInDays: number = DEFAULT_EXPIRATION_DAYS
  ) {
    const uniqueIds = [...new Set(studentIds)];

    const students = await Student.findAll({
      where: { id: uniqueIds },
      attributes: ["id"],
    });
    const existingIds = new Set(students.map((student) => student.id));

    const previousInvitations = await SurveyInvitation.findAll({
      where: { surveyId: survey.id, studentId: uniqueIds },
      attributes: ["studentId"],
    });
    const invitedIds = new Set(previousInvitations.map((invitation) => invitation.studentId));

    const pending = uniqueIds
      .filter((studentId) => existingIds.has(studentId) && !invitedIds.has(studentId))
      .map((studentId) => ({ studentId, token: randomBytes(32).toString("hex") }));

    const sentAt = new Date();
    const expiresAt = new Date(sentAt.getTime() + expiresInDays * MS_PER_DAY);

    const invitations = await SurveyInvitation.bulkCreate(
      pending.map(({ studentId, token }) => ({
        surveyId: survey.id,
        studentId,
        tokenHash: hashToken(token),
        sentAt,
        expiresAt,
        completedAt: null,
      }))
    );

    return {
      created: invitations.map((invitation, index) => ({
        invitationId: invitation.id,
        studentId: invitation.studentId,
        token: pending[index].token,
      })),
      alreadyInvited: uniqueIds.filter((studentId) => invitedIds.has(studentId)),
      notFound: uniqueIds.filter((studentId) => !existingIds.has(studentId)),
    };
  }

  // HU-11: invitación a partir del token del enlace, solo si no ha caducado ni se ha respondido.
  // Incluye la encuesta y sus preguntas en orden, para mostrar el formulario. null si el enlace no es válido.
  static async findValidByToken(token: string) {
    return SurveyInvitation.findOne({
      where: {
        tokenHash: hashToken(token),
        completedAt: null,
        expiresAt: { [Op.gt]: new Date() },
      },
      attributes: ["id", "surveyId", "expiresAt"],
      include: [
        {
          ...includeSurvey,
          include: [
            {
              model: SurveyQuestion,
              as: "questions",
              attributes: ["id", "questionText", "questionType", "sortOrder", "isRequired"],
              separate: true,
              order: [["sortOrder", "ASC"]],
            },
          ],
        },
      ],
    });
  }

  static async create(data: {
    surveyId: number;
    studentId: number;
    tokenHash: string;
    sentAt?: Date;
    expiresAt: Date;
    completedAt?: Date | null;
  }) {
    return SurveyInvitation.create(data);
  }


  static async update(
    surveyInvitation: SurveyInvitation,
    data: {
      surveyId?: number;
      studentId?: number;
      tokenHash?: string;
      sentAt?: Date;
      expiresAt?: Date;
      completedAt?: Date | null;
    }
  ) {
    return surveyInvitation.update(data);
  }


  static async delete(surveyInvitation: SurveyInvitation) {
    await surveyInvitation.destroy();
  }
}
