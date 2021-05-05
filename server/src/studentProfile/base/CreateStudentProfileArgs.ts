import { ArgsType, Field } from "@nestjs/graphql";
import { StudentProfileCreateInput } from "./StudentProfileCreateInput";

@ArgsType()
class CreateStudentProfileArgs {
  @Field(() => StudentProfileCreateInput, { nullable: false })
  data!: StudentProfileCreateInput;
}

export { CreateStudentProfileArgs };
