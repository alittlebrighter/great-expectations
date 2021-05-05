import { ArgsType, Field } from "@nestjs/graphql";
import { StudentProfileWhereUniqueInput } from "./StudentProfileWhereUniqueInput";
import { StudentProfileUpdateInput } from "./StudentProfileUpdateInput";

@ArgsType()
class UpdateStudentProfileArgs {
  @Field(() => StudentProfileWhereUniqueInput, { nullable: false })
  where!: StudentProfileWhereUniqueInput;
  @Field(() => StudentProfileUpdateInput, { nullable: false })
  data!: StudentProfileUpdateInput;
}

export { UpdateStudentProfileArgs };
