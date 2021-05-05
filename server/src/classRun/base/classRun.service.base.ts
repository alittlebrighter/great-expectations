import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  ClassRun,
  User,
  Registration,
  Class,
  Session,
} from "@prisma/client";

export class ClassRunServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.ClassRunFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassRunFindManyArgs>
  ): Promise<ClassRun[]> {
    return this.prisma.classRun.findMany(args);
  }
  async findOne<T extends Prisma.ClassRunFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassRunFindUniqueArgs>
  ): Promise<ClassRun | null> {
    return this.prisma.classRun.findUnique(args);
  }
  async create<T extends Prisma.ClassRunCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassRunCreateArgs>
  ): Promise<ClassRun> {
    return this.prisma.classRun.create<T>(args);
  }
  async update<T extends Prisma.ClassRunUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassRunUpdateArgs>
  ): Promise<ClassRun> {
    return this.prisma.classRun.update<T>(args);
  }
  async delete<T extends Prisma.ClassRunDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassRunDeleteArgs>
  ): Promise<ClassRun> {
    return this.prisma.classRun.delete(args);
  }

  async findInstructors(
    parentId: string,
    args: Prisma.UserFindManyArgs
  ): Promise<User[]> {
    return this.prisma.classRun
      .findUnique({
        where: { id: parentId },
      })
      .instructors(args);
  }

  async findRegistrations(
    parentId: string,
    args: Prisma.RegistrationFindManyArgs
  ): Promise<Registration[]> {
    return this.prisma.classRun
      .findUnique({
        where: { id: parentId },
      })
      .registrations(args);
  }

  async getClass(parentId: string): Promise<Class | null> {
    return this.prisma.classRun
      .findUnique({
        where: { id: parentId },
      })
      .class();
  }

  async getSession(parentId: string): Promise<Session | null> {
    return this.prisma.classRun
      .findUnique({
        where: { id: parentId },
      })
      .session();
  }
}
