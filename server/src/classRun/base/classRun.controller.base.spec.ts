import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { ClassRunController } from "../classRun.controller";
import { ClassRunService } from "../classRun.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cost: 42.42,
  createdAt: new Date(),
  id: "exampleId",
  maxGrade: 42,
  minGrade: 42,
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  cost: 42.42,
  createdAt: new Date(),
  id: "exampleId",
  maxGrade: 42,
  minGrade: 42,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    cost: 42.42,
    createdAt: new Date(),
    id: "exampleId",
    maxGrade: 42,
    minGrade: 42,
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  cost: 42.42,
  createdAt: new Date(),
  id: "exampleId",
  maxGrade: 42,
  minGrade: 42,
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("ClassRun", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ClassRunService,
          useValue: service,
        },
      ],
      controllers: [ClassRunController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /class-runs", async () => {
    await request(app.getHttpServer())
      .post("/class-runs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /class-runs", async () => {
    await request(app.getHttpServer())
      .get("/class-runs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /class-runs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/class-runs"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /class-runs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/class-runs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});