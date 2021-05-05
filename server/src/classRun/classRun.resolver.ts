import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ClassRunResolverBase } from "./base/classRun.resolver.base";
import { ClassRun } from "./base/ClassRun";
import { ClassRunService } from "./classRun.service";

@graphql.Resolver(() => ClassRun)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ClassRunResolver extends ClassRunResolverBase {
  constructor(
    protected readonly service: ClassRunService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
