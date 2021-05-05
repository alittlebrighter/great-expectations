import { ArgsType, Field } from "@nestjs/graphql";
import { ClassRunWhereUniqueInput } from "./ClassRunWhereUniqueInput";

@ArgsType()
class DeleteClassRunArgs {
  @Field(() => ClassRunWhereUniqueInput, { nullable: false })
  where!: ClassRunWhereUniqueInput;
}

export { DeleteClassRunArgs };
