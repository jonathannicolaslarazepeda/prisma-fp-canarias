import { Company } from "./company.model.js";
import { Internship } from "../internships/internship.model.js";
import { EmploymentRecord } from "../employment-records/employment-record.model.js";

const includeInternships = {
  model: Internship,
  as: "internships",
  attributes: ["id", "enrollmentId", "startDate", "endDate", "wasHired"],
};

const includeEmploymentRecords = {
  model: EmploymentRecord,
  as: "employmentRecords",
  attributes: ["id", "studentId", "position", "startDate", "endDate"],
};

export class CompanyService {

  static async findAll() {
    return Company.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Company.findByPk(id);
  }

  static async findAllEagerly() {
    return Company.findAll({
      include: [includeInternships, includeEmploymentRecords],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return Company.findByPk(id, {
      include: [includeInternships, includeEmploymentRecords],
    });
  }

  static async create(data: {
    taxId: string;
    name: string;
    sector?: string | null;
    city?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
  }) {
    return Company.create(data);
  }


  static async update(
    company: Company,
    data: {
      taxId?: string;
      name?: string;
      sector?: string | null;
      city?: string | null;
      contactEmail?: string | null;
      contactPhone?: string | null;
    }
  ) {
    return company.update(data);
  }


  static async delete(company: Company) {
    await company.destroy();
  }
}
