import { ArgsType, Field } from "@nestjs/graphql";
import { ClassWhereUniqueInput } from "./ClassWhereUniqueInput";

@ArgsType()
class ClassFindUniqueArgs {
  @Field(() => ClassWhereUniqueInput, { nullable: false })
  where!: ClassWhereUniqueInput;
}

export { ClassFindUniqueArgs };
