import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { RegistrationServiceBase } from "./base/registration.service.base";

@Injectable()
export class RegistrationService extends RegistrationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
