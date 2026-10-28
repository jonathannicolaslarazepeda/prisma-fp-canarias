import { Survey } from "./survey.model";
import { SurveyQuestion } from "../survey-questions/survey-question.model";

const includeQuestions = {
  model: SurveyQuestion,
  as: "questions",
  attributes: ["id", "questionText", "questionType", "sortOrder", "isRequired"],
};

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
