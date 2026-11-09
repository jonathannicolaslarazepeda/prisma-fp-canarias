import { Internship } from "./internship.model.js";
import { Company } from "../companies/company.model.js";
import { EmploymentRecord } from "../employment-records/employment-record.model.js";

const includeCompany = {
  model: Company,
  as: "company",
  attributes: ["id", "taxId", "name"],
};

const includeEmploymentRecords = {
  model: EmploymentRecord,
  as: "employmentRecords",
  attributes: ["id", "studentId", "position", "startDate", "endDate"],
};

export class InternshipService {

  static async findAll() {
    return Internship.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Internship.findByPk(id);
  }

  static async findAllEagerly() {
    return Internship.findAll({
      include: [includeCompany, includeEmploymentRecords],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return Internship.findByPk(id, {
      include: [includeCompany, includeEmploymentRecords],
    });
  }

  static async create(data: {
    enrollmentId: number;
    companyId: number;
    startDate: string;
    endDate?: string | null;
    wasHired?: boolean;
    hiringDate?: string | null;
  }) {
    return Internship.create(data);
  }


  static async update(
    internship: Internship,
    data: {
      enrollmentId?: number;
      companyId?: number;
      startDate?: string;
      endDate?: string | null;
      wasHired?: boolean;
      hiringDate?: string | null;
    }
  ) {
    return internship.update(data);
  }


  static async delete(internship: Internship) {
    await internship.destroy();
  }
}
