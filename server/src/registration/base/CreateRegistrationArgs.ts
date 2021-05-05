import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationCreateInput } from "./RegistrationCreateInput";

@ArgsType()
class CreateRegistrationArgs {
  @Field(() => RegistrationCreateInput, { nullable: false })
  data!: RegistrationCreateInput;
}

export { CreateRegistrationArgs };
