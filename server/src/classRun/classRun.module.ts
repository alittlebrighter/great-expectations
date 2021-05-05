import { Module } from "@nestjs/common";
import { ClassRunModuleBase } from "./base/classRun.module.base";
import { ClassRunService } from "./classRun.service";
import { ClassRunController } from "./classRun.controller";
import { ClassRunResolver } from "./classRun.resolver";

@Module({
  imports: [ClassRunModuleBase],
  controllers: [ClassRunController],
  providers: [ClassRunService, ClassRunResolver],
  exports: [ClassRunService],
})
export class ClassRunModule {}
