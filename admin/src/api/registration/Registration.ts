import { ClassRunWhereUniqueInput } from "../classRun/ClassRunWhereUniqueInput";
import { StudentProfileWhereUniqueInput } from "../studentProfile/StudentProfileWhereUniqueInput";

export type Registration = {
  classRun?: ClassRunWhereUniqueInput;
  createdAt: Date;
  id: string;
  paid: number | null;
  student?: StudentProfileWhereUniqueInput | null;
  updatedAt: Date;
};
