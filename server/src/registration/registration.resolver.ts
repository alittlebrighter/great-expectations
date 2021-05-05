import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { RegistrationResolverBase } from "./base/registration.resolver.base";
import { Registration } from "./base/Registration";
import { RegistrationService } from "./registration.service";

@graphql.Resolver(() => Registration)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RegistrationResolver extends RegistrationResolverBase {
  constructor(
    protected readonly service: RegistrationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
