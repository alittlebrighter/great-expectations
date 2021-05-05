import { Module } from "@nestjs/common";
import { StudentProfileModuleBase } from "./base/studentProfile.module.base";
import { StudentProfileService } from "./studentProfile.service";
import { StudentProfileController } from "./studentProfile.controller";
import { StudentProfileResolver } from "./studentProfile.resolver";

@Module({
  imports: [StudentProfileModuleBase],
  controllers: [StudentProfileController],
  providers: [StudentProfileService, StudentProfileResolver],
  exports: [StudentProfileService],
})
export class StudentProfileModule {}
