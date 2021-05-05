import { PrismaService } from "nestjs-prisma";
import { Prisma, Registration, ClassRun, StudentProfile } from "@prisma/client";

export class RegistrationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.RegistrationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RegistrationFindManyArgs>
  ): Promise<Registration[]> {
    return this.prisma.registration.findMany(args);
  }
  async findOne<T extends Prisma.RegistrationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RegistrationFindUniqueArgs>
  ): Promise<Registration | null> {
    return this.prisma.registration.findUnique(args);
  }
  async create<T extends Prisma.RegistrationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RegistrationCreateArgs>
  ): Promise<Registration> {
    return this.prisma.registration.create<T>(args);
  }
  async update<T extends Prisma.RegistrationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RegistrationUpdateArgs>
  ): Promise<Registration> {
    return this.prisma.registration.update<T>(args);
  }
  async delete<T extends Prisma.RegistrationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RegistrationDeleteArgs>
  ): Promise<Registration> {
    return this.prisma.registration.delete(args);
  }

  async getClassRun(parentId: string): Promise<ClassRun | null> {
    return this.prisma.registration
      .findUnique({
        where: { id: parentId },
      })
      .classRun();
  }

  async getStudent(parentId: string): Promise<StudentProfile | null> {
    return this.prisma.registration
      .findUnique({
        where: { id: parentId },
      })
      .student();
  }
}
