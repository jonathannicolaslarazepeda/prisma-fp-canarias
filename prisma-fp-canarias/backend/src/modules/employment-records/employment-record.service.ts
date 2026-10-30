import { EmploymentRecord } from "./employment-record.model.js";
import { Company } from "../companies/company.model.js";
import { Internship } from "../internships/internship.model.js";

const includeCompany = {
  model: Company,
  as: "company",
  attributes: ["id", "taxId", "name"],
};

const includeInternship = {
  model: Internship,
  as: "internship",
  attributes: ["id", "enrollmentId", "startDate", "endDate", "wasHired"],
};

export class EmploymentRecordService {

  static async findAll() {
    return EmploymentRecord.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return EmploymentRecord.findByPk(id);
  }

  static async findAllEagerly() {
    return EmploymentRecord.findAll({
      include: [includeCompany, includeInternship],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return EmploymentRecord.findByPk(id, {
      include: [includeCompany, includeInternship],
    });
  }

  static async create(data: {
    studentId: number;
    companyId: number;
    internshipId?: number | null;
    position: string;
    sector?: string | null;
    startDate: string;
    endDate?: string | null;
    isRelatedToStudies?: boolean;
  }) {
    return EmploymentRecord.create(data);
  }


  static async update(
    employmentRecord: EmploymentRecord,
    data: {
      studentId?: number;
      companyId?: number;
      internshipId?: number | null;
      position?: string;
      sector?: string | null;
      startDate?: string;
      endDate?: string | null;
      isRelatedToStudies?: boolean;
    }
  ) {
    return employmentRecord.update(data);
  }


  static async delete(employmentRecord: EmploymentRecord) {
    await employmentRecord.destroy();
  }
}
