import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateRegistrationArgs } from "./CreateRegistrationArgs";
import { UpdateRegistrationArgs } from "./UpdateRegistrationArgs";
import { DeleteRegistrationArgs } from "./DeleteRegistrationArgs";
import { RegistrationFindManyArgs } from "./RegistrationFindManyArgs";
import { RegistrationFindUniqueArgs } from "./RegistrationFindUniqueArgs";
import { Registration } from "./Registration";
import { ClassRun } from "../../classRun/base/ClassRun";
import { StudentProfile } from "../../studentProfile/base/StudentProfile";
import { RegistrationService } from "../registration.service";

@graphql.Resolver(() => Registration)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RegistrationResolverBase {
  constructor(
    protected readonly service: RegistrationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Registration])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async registrations(
    @graphql.Args() args: RegistrationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Registration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "own",
  })
  async registration(
    @graphql.Args() args: RegistrationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Registration",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "create",
    possession: "any",
  })
  async createRegistration(
    @graphql.Args() args: CreateRegistrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Registration",
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
        `providing the properties: ${properties} on ${"Registration"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        classRun: {
          connect: args.data.classRun,
        },

        student: args.data.student
          ? {
              connect: args.data.student,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateRegistration(
    @graphql.Args() args: UpdateRegistrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
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
        `providing the properties: ${properties} on ${"Registration"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          classRun: {
            connect: args.data.classRun,
          },

          student: args.data.student
            ? {
                connect: args.data.student,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "delete",
    possession: "any",
  })
  async deleteRegistration(
    @graphql.Args() args: DeleteRegistrationArgs
  ): Promise<Registration | null> {
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

  @graphql.ResolveField(() => ClassRun, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async classRun(
    @graphql.Parent() parent: Registration,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ClassRun | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ClassRun",
    });
    const result = await this.service.getClassRun(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => StudentProfile, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async student(
    @graphql.Parent() parent: Registration,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StudentProfile | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "StudentProfile",
    });
    const result = await this.service.getStudent(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
