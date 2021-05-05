import { ArgsType, Field } from "@nestjs/graphql";
import { ClassWhereInput } from "./ClassWhereInput";

@ArgsType()
class ClassFindManyArgs {
  @Field(() => ClassWhereInput, { nullable: true })
  where?: ClassWhereInput;
}

export { ClassFindManyArgs };
