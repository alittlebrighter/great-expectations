import { ClassWhereUniqueInput } from "../class/ClassWhereUniqueInput";
import { SessionWhereUniqueInput } from "../session/SessionWhereUniqueInput";

export type ClassRunUpdateInput = {
  class?: ClassWhereUniqueInput;
  cost?: number;
  maxGrade?: number | null;
  minGrade?: number | null;
  session?: SessionWhereUniqueInput;
};
