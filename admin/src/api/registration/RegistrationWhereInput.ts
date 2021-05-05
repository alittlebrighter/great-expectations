import { ClassRunWhereUniqueInput } from "../classRun/ClassRunWhereUniqueInput";
import { StudentProfileWhereUniqueInput } from "../studentProfile/StudentProfileWhereUniqueInput";

export type RegistrationWhereInput = {
  classRun?: ClassRunWhereUniqueInput;
  createdAt?: Date;
  id?: string;
  paid?: number;
  student?: StudentProfileWhereUniqueInput;
  updatedAt?: Date;
};
