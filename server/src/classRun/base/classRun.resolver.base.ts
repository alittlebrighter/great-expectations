import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateClassRunArgs } from "./CreateClassRunArgs";
import { UpdateClassRunArgs } from "./UpdateClassRunArgs";
import { DeleteClassRunArgs } from "./DeleteClassRunArgs";
import { ClassRunFindManyArgs } from "./ClassRunFindManyArgs";
import { ClassRunFindUniqueArgs } from "./ClassRunFindUniqueArgs";
import { ClassRun } from "./ClassRun";
import { UserFindManyArgs } from "../../user/base/UserFindManyArgs";
import { User } from "../../user/base/User";
import { RegistrationFindManyArgs } from "../../registration/base/RegistrationFindManyArgs";
import { Registration } from "../../registration/base/Registration";
import { Class } from "../../class/base/Class";
import { Session } from "../../session/base/Session";
import { ClassRunService } from "../classRun.service";

@graphql.Resolver(() => ClassRun)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ClassRunResolverBase {
  constructor(
    protected readonly service: ClassRunService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [ClassRun])
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async classRuns(
    @graphql.Args() args: ClassRunFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ClassRun[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ClassRun",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ClassRun, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "own",
  })
  async classRun(
    @graphql.Args() args: ClassRunFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ClassRun | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ClassRun",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ClassRun)
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "create",
    possession: "any",
  })
  async createClassRun(
    @graphql.Args() args: CreateClassRunArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ClassRun> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ClassRun",
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
        `providing the properties: ${properties} on ${"ClassRun"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        class: {
          connect: args.data.class,
        },

        session: {
          connect: args.data.session,
        },
      },
    });
  }

  @graphql.Mutation(() => ClassRun)
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async updateClassRun(
    @graphql.Args() args: UpdateClassRunArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ClassRun | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
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
        `providing the properties: ${properties} on ${"ClassRun"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          class: {
            connect: args.data.class,
          },

          session: {
            connect: args.data.session,
          },
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

  @graphql.Mutation(() => ClassRun)
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "delete",
    possession: "any",
  })
  async deleteClassRun(
    @graphql.Args() args: DeleteClassRunArgs
  ): Promise<ClassRun | null> {
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

  @graphql.ResolveField(() => [User])
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async instructors(
    @graphql.Parent() parent: ClassRun,
    @graphql.Args() args: UserFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service.findInstructors(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Registration])
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async registrations(
    @graphql.Parent() parent: ClassRun,
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

  @graphql.ResolveField(() => Class, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async class(
    @graphql.Parent() parent: ClassRun,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Class",
    });
    const result = await this.service.getClass(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Session, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async session(
    @graphql.Parent() parent: ClassRun,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Session | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Session",
    });
    const result = await this.service.getSession(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
