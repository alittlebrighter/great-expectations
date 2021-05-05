import { ClassWhereUniqueInput } from "../class/ClassWhereUniqueInput";
import { SessionWhereUniqueInput } from "../session/SessionWhereUniqueInput";

export type ClassRun = {
  class?: ClassWhereUniqueInput;
  cost: number;
  createdAt: Date;
  id: string;
  maxGrade: number | null;
  minGrade: number | null;
  session?: SessionWhereUniqueInput;
  updatedAt: Date;
};
