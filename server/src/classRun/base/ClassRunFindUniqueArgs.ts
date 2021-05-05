import { ArgsType, Field } from "@nestjs/graphql";
import { ClassRunWhereUniqueInput } from "./ClassRunWhereUniqueInput";

@ArgsType()
class ClassRunFindUniqueArgs {
  @Field(() => ClassRunWhereUniqueInput, { nullable: false })
  where!: ClassRunWhereUniqueInput;
}

export { ClassRunFindUniqueArgs };
