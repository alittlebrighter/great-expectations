import { ArgsType, Field } from "@nestjs/graphql";
import { StudentProfileWhereUniqueInput } from "./StudentProfileWhereUniqueInput";

@ArgsType()
class StudentProfileFindUniqueArgs {
  @Field(() => StudentProfileWhereUniqueInput, { nullable: false })
  where!: StudentProfileWhereUniqueInput;
}

export { StudentProfileFindUniqueArgs };
