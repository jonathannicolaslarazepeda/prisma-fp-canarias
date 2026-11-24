import { Op } from "sequelize";
import { EmploymentRecord } from "./employment-record.model.js";
import { Company } from "../companies/company.model.js";
import { Internship } from "../internships/internship.model.js";
import { studentEnrollment } from "../students-enrollments/student-enrollment.model.js";

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

const MS_PER_DAY = 86_400_000;

// Fecha "YYYY-MM-DD" (o Date) → "YYYY-MM-DD".
function toDateOnly(value: string | Date): string {
  return typeof value === "string" ? value.slice(0, 10) : value.toISOString().slice(0, 10);
}

// "YYYY-MM-DD" → Date a medianoche UTC, para que el cálculo no dependa de la zona horaria.
function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

// Suma meses; si el día no existe en el mes destino, usa el último (31 ene + 1 mes = 28/29 feb).
function addMonths(date: Date, months: number): Date {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + months;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(date.getUTCDate(), lastDay)));
}

// Tiempo entre dos fechas: años, meses y días de calendario, más el total de días.
function elapsedBetween(from: string, to: string) {
  const start = parseDateOnly(from);
  const end = parseDateOnly(to);

  let totalMonths =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());
  if (addMonths(start, totalMonths) > end) totalMonths -= 1;

  const anchor = addMonths(start, totalMonths);

  return {
    elapsed: {
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12,
      days: Math.round((end.getTime() - anchor.getTime()) / MS_PER_DAY),
    },
    totalDays: Math.round((end.getTime() - start.getTime()) / MS_PER_DAY),
  };
}

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

  // HU-05: historial laboral de un alumno (varias entradas).
  static async findAllByStudentId(studentId: number) {
    return EmploymentRecord.findAll({
      where: { studentId },
      include: [includeCompany, includeInternship],
      order: [["startDate", "ASC"]],
    });
  }

  // HU-05: primer empleo desde la titulación y tiempo transcurrido.
  // null si el alumno no tiene fecha de titulación; firstEmployment null si aún no tiene empleo posterior.
  static async getFirstEmployment(studentId: number) {
    const enrollment = await studentEnrollment.findOne({
      where: { studentId, graduationDate: { [Op.ne]: null } },
      attributes: ["graduationDate"],
      order: [["graduationDate", "ASC"]],
    });
    if (!enrollment) return null;

    const graduationDate = toDateOnly(enrollment.graduationDate);

    const firstEmployment = await EmploymentRecord.findOne({
      where: { studentId, startDate: { [Op.gte]: graduationDate } },
      include: [includeCompany],
      order: [["startDate", "ASC"]],
    });
    if (!firstEmployment) {
      return { graduationDate, firstEmployment: null, elapsed: null, totalDays: null };
    }

    const { elapsed, totalDays } = elapsedBetween(graduationDate, toDateOnly(firstEmployment.startDate));
    return { graduationDate, firstEmployment, elapsed, totalDays };
  }

  // HU-05: si se vincula a unas prácticas, deben ser del mismo alumno y de la misma empresa.
  // Devuelve el mensaje de error o null. En update, pasar la instancia actual.
  static async validateInternshipLink(
    data: {
      studentId?: number;
      companyId?: number;
      internshipId?: number | null;
    },
    current?: EmploymentRecord
  ): Promise<string | null> {
    const internshipId = data.internshipId !== undefined ? data.internshipId : current?.internshipId ?? null;
    if (internshipId === null) return null;

    const studentId = data.studentId ?? current?.studentId;
    const companyId = data.companyId ?? current?.companyId;

    const internship = await Internship.findByPk(internshipId, {
      attributes: ["enrollmentId", "companyId"],
    });
    if (!internship) {
      return "Las prácticas indicadas no existen";
    }
    if (internship.companyId !== companyId) {
      return "La empresa no coincide con la empresa de las prácticas";
    }

    const enrollment = await studentEnrollment.findByPk(internship.enrollmentId, {
      attributes: ["studentId"],
    });
    if (!enrollment || enrollment.studentId !== studentId) {
      return "Las prácticas indicadas no pertenecen a este alumno";
    }
    return null;
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
