import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { StudentProfileServiceBase } from "./base/studentProfile.service.base";

@Injectable()
export class StudentProfileService extends StudentProfileServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
