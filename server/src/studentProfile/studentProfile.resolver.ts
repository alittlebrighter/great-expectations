import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { StudentProfileResolverBase } from "./base/studentProfile.resolver.base";
import { StudentProfile } from "./base/StudentProfile";
import { StudentProfileService } from "./studentProfile.service";

@graphql.Resolver(() => StudentProfile)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StudentProfileResolver extends StudentProfileResolverBase {
  constructor(
    protected readonly service: StudentProfileService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
