import { PrismaService } from "nestjs-prisma";
import { Prisma, StudentProfile, Registration } from "@prisma/client";

export class StudentProfileServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.StudentProfileFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StudentProfileFindManyArgs>
  ): Promise<StudentProfile[]> {
    return this.prisma.studentProfile.findMany(args);
  }
  async findOne<T extends Prisma.StudentProfileFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.StudentProfileFindUniqueArgs>
  ): Promise<StudentProfile | null> {
    return this.prisma.studentProfile.findUnique(args);
  }
  async create<T extends Prisma.StudentProfileCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StudentProfileCreateArgs>
  ): Promise<StudentProfile> {
    return this.prisma.studentProfile.create<T>(args);
  }
  async update<T extends Prisma.StudentProfileUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StudentProfileUpdateArgs>
  ): Promise<StudentProfile> {
    return this.prisma.studentProfile.update<T>(args);
  }
  async delete<T extends Prisma.StudentProfileDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.StudentProfileDeleteArgs>
  ): Promise<StudentProfile> {
    return this.prisma.studentProfile.delete(args);
  }

  async findRegistrations(
    parentId: string,
    args: Prisma.RegistrationFindManyArgs
  ): Promise<Registration[]> {
    return this.prisma.studentProfile
      .findUnique({
        where: { id: parentId },
      })
      .registrations(args);
  }
}
