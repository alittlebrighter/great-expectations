import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ClassRunService } from "./classRun.service";
import { ClassRunControllerBase } from "./base/classRun.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("class-runs")
@common.Controller("class-runs")
export class ClassRunController extends ClassRunControllerBase {
  constructor(
    protected readonly service: ClassRunService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
