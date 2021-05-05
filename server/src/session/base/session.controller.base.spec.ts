import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { SessionController } from "../session.controller";
import { SessionService } from "../session.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  end: new Date(),
  id: "exampleId",
  start: new Date(),
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  end: new Date(),
  id: "exampleId",
  start: new Date(),
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    end: new Date(),
    id: "exampleId",
    start: new Date(),
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  end: new Date(),
  id: "exampleId",
  start: new Date(),
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

describe("Session", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SessionService,
          useValue: service,
        },
      ],
      controllers: [SessionController],
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

  test("POST /sessions", async () => {
    await request(app.getHttpServer())
      .post("/sessions")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        end: CREATE_RESULT.end.toISOString(),
        start: CREATE_RESULT.start.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /sessions", async () => {
    await request(app.getHttpServer())
      .get("/sessions")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          end: FIND_MANY_RESULT[0].end.toISOString(),
          start: FIND_MANY_RESULT[0].start.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /sessions/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/sessions"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /sessions/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/sessions"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        end: FIND_ONE_RESULT.end.toISOString(),
        start: FIND_ONE_RESULT.start.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
