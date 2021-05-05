import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ClassWhereInput = {
  createdAt?: Date;
  description?: string;
  id?: string;
  imageURL?: string;
  owner?: UserWhereUniqueInput;
  title?: string;
  updatedAt?: Date;
};
