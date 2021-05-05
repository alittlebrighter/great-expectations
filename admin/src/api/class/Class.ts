import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Class = {
  createdAt: Date;
  description: string | null;
  id: string;
  imageURL: string | null;
  owner?: UserWhereUniqueInput;
  title: string;
  updatedAt: Date;
};
