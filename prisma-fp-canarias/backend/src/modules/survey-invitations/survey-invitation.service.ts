import { SurveyInvitation } from "./survey-invitation.model.js";
import { Survey } from "../surveys/survey.model.js";
import { SurveyAnswer } from "../survey-answers/survey-answer.model.js";

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
