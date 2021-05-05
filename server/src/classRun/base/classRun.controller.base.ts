import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { ClassRunService } from "../classRun.service";
import { ClassRunCreateInput } from "./ClassRunCreateInput";
import { ClassRunWhereInput } from "./ClassRunWhereInput";
import { ClassRunWhereUniqueInput } from "./ClassRunWhereUniqueInput";
import { ClassRunUpdateInput } from "./ClassRunUpdateInput";
import { ClassRun } from "./ClassRun";
import { UserWhereInput } from "../../user/base/UserWhereInput";
import { User } from "../../user/base/User";
import { RegistrationWhereInput } from "../../registration/base/RegistrationWhereInput";
import { Registration } from "../../registration/base/Registration";

export class ClassRunControllerBase {
  constructor(
    protected readonly service: ClassRunService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: ClassRun })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: ClassRunCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ClassRun> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"ClassRun"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        class: {
          connect: data.class,
        },

        session: {
          connect: data.session,
        },
      },
      select: {
        class: {
          select: {
            id: true,
          },
        },

        cost: true,
        createdAt: true,
        id: true,
        maxGrade: true,
        minGrade: true,

        session: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [ClassRun] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ClassRunWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ClassRun[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ClassRun",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        class: {
          select: {
            id: true,
          },
        },

        cost: true,
        createdAt: true,
        id: true,
        maxGrade: true,
        minGrade: true,

        session: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: ClassRun })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: ClassRunWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ClassRun | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ClassRun",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        class: {
          select: {
            id: true,
          },
        },

        cost: true,
        createdAt: true,
        id: true,
        maxGrade: true,
        minGrade: true,

        session: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ClassRun })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body()
    data: ClassRunUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ClassRun | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"ClassRun"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          class: {
            connect: data.class,
          },

          session: {
            connect: data.session,
          },
        },
        select: {
          class: {
            select: {
              id: true,
            },
          },

          cost: true,
          createdAt: true,
          id: true,
          maxGrade: true,
          minGrade: true,

          session: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ClassRun })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: ClassRunWhereUniqueInput
  ): Promise<ClassRun | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          class: {
            select: {
              id: true,
            },
          },

          cost: true,
          createdAt: true,
          id: true,
          maxGrade: true,
          minGrade: true,

          session: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/instructors")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async findManyInstructors(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Query() query: UserWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service.findInstructors(params.id, {
      where: query,
      select: {
        createdAt: true,
        firstName: true,
        id: true,
        lastName: true,
        roles: true,
        updatedAt: true,
        username: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/instructors")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async createInstructors(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body() body: ClassRunWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      instructors: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ClassRun"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/instructors")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async updateInstructors(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body() body: ClassRunWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      instructors: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ClassRun"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/instructors")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async deleteInstructors(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body() body: ClassRunWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      instructors: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ClassRun"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/registrations")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "read",
    possession: "any",
  })
  async findManyRegistrations(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Query() query: RegistrationWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Registration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const results = await this.service.findRegistrations(params.id, {
      where: query,
      select: {
        classRun: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        paid: true,

        student: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/registrations")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async createRegistrations(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body() body: ClassRunWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      registrations: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ClassRun"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/registrations")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async updateRegistrations(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body() body: ClassRunWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      registrations: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ClassRun"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/registrations")
  @nestAccessControl.UseRoles({
    resource: "ClassRun",
    action: "update",
    possession: "any",
  })
  async deleteRegistrations(
    @common.Param() params: ClassRunWhereUniqueInput,
    @common.Body() body: ClassRunWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      registrations: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ClassRun",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ClassRun"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
