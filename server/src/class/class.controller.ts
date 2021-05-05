import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ClassService } from "./class.service";
import { ClassControllerBase } from "./base/class.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("classes")
@common.Controller("classes")
export class ClassController extends ClassControllerBase {
  constructor(
    protected readonly service: ClassService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
