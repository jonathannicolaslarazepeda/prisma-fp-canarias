import { Internship } from "./internship.model.js";
import { Company } from "../companies/company.model.js";
import { EmploymentRecord } from "../employment-records/employment-record.model.js";
import { studentEnrollment } from "../students-enrollments/student-enrollment.model.js";
import { Consent } from "../consents/consent.model.js";

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

// Valor de Consent.status que indica consentimiento otorgado (confirmar con el módulo de consentimientos).
const ACTIVE_CONSENT_STATUS = "granted";

// Alumnado cuyo último registro de consentimiento está otorgado (HU-06).
async function findStudentIdsWithActiveConsent(): Promise<Set<number>> {
  const consents = await Consent.findAll({
    attributes: ["studentId", "status"],
    order: [["recordedAt", "ASC"], ["id", "ASC"]],
  });

  const latestStatus = new Map<number, string>();
  for (const consent of consents) {
    latestStatus.set(consent.studentId, consent.status);
  }

  const studentIds = new Set<number>();
  for (const [studentId, status] of latestStatus) {
    if (status === ACTIVE_CONSENT_STATUS) studentIds.add(studentId);
  }
  return studentIds;
}

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

  // HU-10: prácticas de un alumno, para la ficha del alumno.
  static async findAllByStudentId(studentId: number) {
    const enrollments = await studentEnrollment.findAll({
      where: { studentId },
      attributes: ["id"],
    });

    return Internship.findAll({
      where: { enrollmentId: enrollments.map((enrollment) => enrollment.id) },
      include: [includeCompany],
      order: [["startDate", "ASC"]],
    });
  }

  // HU-10: % de alumnos contratados por su empresa de prácticas (solo alumnado con consentimiento activo).
  static async getHiringRate() {
    const internships = await Internship.findAll({
      attributes: ["enrollmentId", "wasHired"],
    });

    const enrollments = await studentEnrollment.findAll({
      where: { id: [...new Set(internships.map((internship) => internship.enrollmentId))] },
      attributes: ["id", "studentId"],
    });
    const studentByEnrollment = new Map<number, number>();
    for (const enrollment of enrollments) {
      studentByEnrollment.set(enrollment.id, enrollment.studentId);
    }

    const consentedStudents = await findStudentIdsWithActiveConsent();

    const students = new Set<number>();
    const hiredStudents = new Set<number>();
    for (const internship of internships) {
      const studentId = studentByEnrollment.get(internship.enrollmentId);
      if (studentId === undefined || !consentedStudents.has(studentId)) continue;

      students.add(studentId);
      if (internship.wasHired) hiredStudents.add(studentId);
    }

    const percentage = students.size === 0
      ? 0
      : Math.round((hiredStudents.size / students.size) * 1000) / 10;

    return {
      totalStudents: students.size,
      hiredStudents: hiredStudents.size,
      percentage,
    };
  }

  // HU-10: coherencia entre "contratado" y su fecha. Devuelve el mensaje de error o null.
  // En update, pasar la instancia actual para completar los campos que no vienen en data.
  static validateHiring(
    data: {
      startDate?: string;
      wasHired?: boolean;
      hiringDate?: string | null;
    },
    current?: Internship
  ): string | null {
    const startDate = data.startDate ?? current?.startDate;
    const wasHired = data.wasHired ?? current?.wasHired ?? false;
    const hiringDate = data.hiringDate !== undefined ? data.hiringDate : current?.hiringDate ?? null;

    if (wasHired && !hiringDate) {
      return "La fecha de contratación es obligatoria si el alumno fue contratado";
    }
    if (!wasHired && hiringDate) {
      return "No puede haber fecha de contratación si el alumno no fue contratado";
    }
    if (hiringDate && startDate && hiringDate < startDate) {
      return "La fecha de contratación no puede ser anterior al inicio de las prácticas";
    }
    return null;
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
