import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StudentProfileService } from "./studentProfile.service";
import { StudentProfileControllerBase } from "./base/studentProfile.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("student-profiles")
@common.Controller("student-profiles")
export class StudentProfileController extends StudentProfileControllerBase {
  constructor(
    protected readonly service: StudentProfileService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
