import { ClassRunWhereUniqueInput } from "../classRun/ClassRunWhereUniqueInput";
import { StudentProfileWhereUniqueInput } from "../studentProfile/StudentProfileWhereUniqueInput";

export type RegistrationUpdateInput = {
  classRun?: ClassRunWhereUniqueInput;
  paid?: number | null;
  student?: StudentProfileWhereUniqueInput | null;
};
