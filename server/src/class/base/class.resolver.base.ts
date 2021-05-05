import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateClassArgs } from "./CreateClassArgs";
import { UpdateClassArgs } from "./UpdateClassArgs";
import { DeleteClassArgs } from "./DeleteClassArgs";
import { ClassFindManyArgs } from "./ClassFindManyArgs";
import { ClassFindUniqueArgs } from "./ClassFindUniqueArgs";
import { Class } from "./Class";
import { ClassRunFindManyArgs } from "../../classRun/base/ClassRunFindManyArgs";
import { ClassRun } from "../../classRun/base/ClassRun";
import { User } from "../../user/base/User";
import { ClassService } from "../class.service";

@graphql.Resolver(() => Class)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ClassResolverBase {
  constructor(
    protected readonly service: ClassService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Class])
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async classes(
    @graphql.Args() args: ClassFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Class",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Class, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "own",
  })
  async class(
    @graphql.Args() args: ClassFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Class",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Class)
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "create",
    possession: "any",
  })
  async createClass(
    @graphql.Args() args: CreateClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Class",
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
        `providing the properties: ${properties} on ${"Class"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        owner: {
          connect: args.data.owner,
        },
      },
    });
  }

  @graphql.Mutation(() => Class)
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "update",
    possession: "any",
  })
  async updateClass(
    @graphql.Args() args: UpdateClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Class",
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
        `providing the properties: ${properties} on ${"Class"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          owner: {
            connect: args.data.owner,
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

  @graphql.Mutation(() => Class)
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "delete",
    possession: "any",
  })
  async deleteClass(
    @graphql.Args() args: DeleteClassArgs
  ): Promise<Class | null> {
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

  @graphql.ResolveField(() => [ClassRun])
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async classRuns(
    @graphql.Parent() parent: Class,
    @graphql.Args() args: ClassRunFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ClassRun[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ClassRun",
    });
    const results = await this.service.findClassRuns(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async owner(
    @graphql.Parent() parent: Class,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getOwner(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
