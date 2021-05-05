import { ArgsType, Field } from "@nestjs/graphql";
import { StudentProfileWhereUniqueInput } from "./StudentProfileWhereUniqueInput";

@ArgsType()
class DeleteStudentProfileArgs {
  @Field(() => StudentProfileWhereUniqueInput, { nullable: false })
  where!: StudentProfileWhereUniqueInput;
}

export { DeleteStudentProfileArgs };
