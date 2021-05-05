import { Module } from "@nestjs/common";
import { RegistrationModuleBase } from "./base/registration.module.base";
import { RegistrationService } from "./registration.service";
import { RegistrationController } from "./registration.controller";
import { RegistrationResolver } from "./registration.resolver";

@Module({
  imports: [RegistrationModuleBase],
  controllers: [RegistrationController],
  providers: [RegistrationService, RegistrationResolver],
  exports: [RegistrationService],
})
export class RegistrationModule {}
