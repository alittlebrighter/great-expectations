import { ArgsType, Field } from "@nestjs/graphql";
import { ClassRunWhereUniqueInput } from "./ClassRunWhereUniqueInput";
import { ClassRunUpdateInput } from "./ClassRunUpdateInput";

@ArgsType()
class UpdateClassRunArgs {
  @Field(() => ClassRunWhereUniqueInput, { nullable: false })
  where!: ClassRunWhereUniqueInput;
  @Field(() => ClassRunUpdateInput, { nullable: false })
  data!: ClassRunUpdateInput;
}

export { UpdateClassRunArgs };
