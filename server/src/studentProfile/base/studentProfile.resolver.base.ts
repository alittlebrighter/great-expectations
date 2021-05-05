import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateStudentProfileArgs } from "./CreateStudentProfileArgs";
import { UpdateStudentProfileArgs } from "./UpdateStudentProfileArgs";
import { DeleteStudentProfileArgs } from "./DeleteStudentProfileArgs";
import { StudentProfileFindManyArgs } from "./StudentProfileFindManyArgs";
import { StudentProfileFindUniqueArgs } from "./StudentProfileFindUniqueArgs";
import { StudentProfile } from "./StudentProfile";
import { RegistrationFindManyArgs } from "../../registration/base/RegistrationFindManyArgs";
import { Registration } from "../../registration/base/Registration";
import { StudentProfileService } from "../studentProfile.service";

@graphql.Resolver(() => StudentProfile)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StudentProfileResolverBase {
  constructor(
    protected readonly service: StudentProfileService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [StudentProfile])
  @nestAccessControl.UseRoles({
    resource: "StudentProfile",
    action: "read",
    possession: "any",
  })
  async studentProfiles(
    @graphql.Args() args: StudentProfileFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StudentProfile[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "StudentProfile",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => StudentProfile, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "StudentProfile",
    action: "read",
    possession: "own",
  })
  async studentProfile(
    @graphql.Args() args: StudentProfileFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StudentProfile | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "StudentProfile",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => StudentProfile)
  @nestAccessControl.UseRoles({
    resource: "StudentProfile",
    action: "create",
    possession: "any",
  })
  async createStudentProfile(
    @graphql.Args() args: CreateStudentProfileArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StudentProfile> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "StudentProfile",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"StudentProfile"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => StudentProfile)
  @nestAccessControl.UseRoles({
    resource: "StudentProfile",
    action: "update",
    possession: "any",
  })
  async updateStudentProfile(
    @graphql.Args() args: UpdateStudentProfileArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StudentProfile | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "StudentProfile",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"StudentProfile"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => StudentProfile)
  @nestAccessControl.UseRoles({
    resource: "StudentProfile",
    action: "delete",
    possession: "any",
  })
  async deleteStudentProfile(
    @graphql.Args() args: DeleteStudentProfileArgs
  ): Promise<StudentProfile | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Registration])
  @nestAccessControl.UseRoles({
    resource: "StudentProfile",
    action: "read",
    possession: "any",
  })
  async registrations(
    @graphql.Parent() parent: StudentProfile,
    @graphql.Args() args: RegistrationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const results = await this.service.findRegistrations(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
