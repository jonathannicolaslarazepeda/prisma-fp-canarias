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
