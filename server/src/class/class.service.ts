import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ClassServiceBase } from "./base/class.service.base";

@Injectable()
export class ClassService extends ClassServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
