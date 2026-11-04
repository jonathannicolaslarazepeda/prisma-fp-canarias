import { SurveyQuestion } from "./survey-question.model.js";
import { Survey } from "../surveys/survey.model.js";

const includeSurvey = {
  model: Survey,
  as: "survey",
  attributes: ["id", "title", "isActive"],
};

export class SurveyQuestionService {

  static async findAll() {
    return SurveyQuestion.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return SurveyQuestion.findByPk(id);
  }

  static async findAllEagerly() {
    return SurveyQuestion.findAll({
      include: [includeSurvey],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return SurveyQuestion.findByPk(id, {
      include: [includeSurvey],
    });
  }

  static async create(data: {
    surveyId: number;
    questionText: string;
    questionType: string;
    sortOrder: number;
    isRequired?: boolean;
  }) {
    return SurveyQuestion.create(data);
  }


  static async update(
    surveyQuestion: SurveyQuestion,
    data: {
      surveyId?: number;
      questionText?: string;
      questionType?: string;
      sortOrder?: number;
      isRequired?: boolean;
    }
  ) {
    return surveyQuestion.update(data);
  }


  static async delete(surveyQuestion: SurveyQuestion) {
    await surveyQuestion.destroy();
  }
}
