import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ClassCreateInput = {
  description?: string | null;
  imageURL?: string | null;
  owner: UserWhereUniqueInput;
  title: string;
};
