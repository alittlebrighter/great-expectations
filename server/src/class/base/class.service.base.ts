import { PrismaService } from "nestjs-prisma";
import { Prisma, Class, ClassRun, User } from "@prisma/client";

export class ClassServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.ClassFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassFindManyArgs>
  ): Promise<Class[]> {
    return this.prisma.class.findMany(args);
  }
  async findOne<T extends Prisma.ClassFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassFindUniqueArgs>
  ): Promise<Class | null> {
    return this.prisma.class.findUnique(args);
  }
  async create<T extends Prisma.ClassCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassCreateArgs>
  ): Promise<Class> {
    return this.prisma.class.create<T>(args);
  }
  async update<T extends Prisma.ClassUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassUpdateArgs>
  ): Promise<Class> {
    return this.prisma.class.update<T>(args);
  }
  async delete<T extends Prisma.ClassDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ClassDeleteArgs>
  ): Promise<Class> {
    return this.prisma.class.delete(args);
  }

  async findClassRuns(
    parentId: string,
    args: Prisma.ClassRunFindManyArgs
  ): Promise<ClassRun[]> {
    return this.prisma.class
      .findUnique({
        where: { id: parentId },
      })
      .classRuns(args);
  }

  async getOwner(parentId: string): Promise<User | null> {
    return this.prisma.class
      .findUnique({
        where: { id: parentId },
      })
      .owner();
  }
}
