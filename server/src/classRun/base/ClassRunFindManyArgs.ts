import { ArgsType, Field } from "@nestjs/graphql";
import { ClassRunWhereInput } from "./ClassRunWhereInput";

@ArgsType()
class ClassRunFindManyArgs {
  @Field(() => ClassRunWhereInput, { nullable: true })
  where?: ClassRunWhereInput;
}

export { ClassRunFindManyArgs };
