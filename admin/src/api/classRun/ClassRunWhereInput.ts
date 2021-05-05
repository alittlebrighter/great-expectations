import { ClassWhereUniqueInput } from "../class/ClassWhereUniqueInput";
import { SessionWhereUniqueInput } from "../session/SessionWhereUniqueInput";

export type ClassRunWhereInput = {
  class?: ClassWhereUniqueInput;
  cost?: number;
  createdAt?: Date;
  id?: string;
  maxGrade?: number;
  minGrade?: number;
  session?: SessionWhereUniqueInput;
  updatedAt?: Date;
};
