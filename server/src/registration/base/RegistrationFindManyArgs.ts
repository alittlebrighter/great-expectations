import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationWhereInput } from "./RegistrationWhereInput";

@ArgsType()
class RegistrationFindManyArgs {
  @Field(() => RegistrationWhereInput, { nullable: true })
  where?: RegistrationWhereInput;
}

export { RegistrationFindManyArgs };
