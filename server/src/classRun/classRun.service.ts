import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ClassRunServiceBase } from "./base/classRun.service.base";

@Injectable()
export class ClassRunService extends ClassRunServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
