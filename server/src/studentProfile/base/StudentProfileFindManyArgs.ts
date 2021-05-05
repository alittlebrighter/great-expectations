import { ArgsType, Field } from "@nestjs/graphql";
import { StudentProfileWhereInput } from "./StudentProfileWhereInput";

@ArgsType()
class StudentProfileFindManyArgs {
  @Field(() => StudentProfileWhereInput, { nullable: true })
  where?: StudentProfileWhereInput;
}

export { StudentProfileFindManyArgs };
