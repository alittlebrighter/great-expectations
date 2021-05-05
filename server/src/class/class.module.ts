import { Module } from "@nestjs/common";
import { ClassModuleBase } from "./base/class.module.base";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { ClassResolver } from "./class.resolver";

@Module({
  imports: [ClassModuleBase],
  controllers: [ClassController],
  providers: [ClassService, ClassResolver],
  exports: [ClassService],
})
export class ClassModule {}
