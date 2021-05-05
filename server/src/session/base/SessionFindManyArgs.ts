import { ArgsType, Field } from "@nestjs/graphql";
import { SessionWhereInput } from "./SessionWhereInput";

@ArgsType()
class SessionFindManyArgs {
  @Field(() => SessionWhereInput, { nullable: true })
  where?: SessionWhereInput;
}

export { SessionFindManyArgs };
