import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationWhereUniqueInput } from "./RegistrationWhereUniqueInput";
import { RegistrationUpdateInput } from "./RegistrationUpdateInput";

@ArgsType()
class UpdateRegistrationArgs {
  @Field(() => RegistrationWhereUniqueInput, { nullable: false })
  where!: RegistrationWhereUniqueInput;
  @Field(() => RegistrationUpdateInput, { nullable: false })
  data!: RegistrationUpdateInput;
}

export { UpdateRegistrationArgs };
