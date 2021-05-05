import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ClassUpdateInput = {
  description?: string | null;
  imageURL?: string | null;
  owner?: UserWhereUniqueInput;
  title?: string;
};
