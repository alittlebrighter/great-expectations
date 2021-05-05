import { ArgsType, Field } from "@nestjs/graphql";
import { ClassRunCreateInput } from "./ClassRunCreateInput";

@ArgsType()
class CreateClassRunArgs {
  @Field(() => ClassRunCreateInput, { nullable: false })
  data!: ClassRunCreateInput;
}

export { CreateClassRunArgs };
