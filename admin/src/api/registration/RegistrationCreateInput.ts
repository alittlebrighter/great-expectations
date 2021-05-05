import { ClassRunWhereUniqueInput } from "../classRun/ClassRunWhereUniqueInput";
import { StudentProfileWhereUniqueInput } from "../studentProfile/StudentProfileWhereUniqueInput";

export type RegistrationCreateInput = {
  classRun: ClassRunWhereUniqueInput;
  paid?: number | null;
  student?: StudentProfileWhereUniqueInput | null;
};
