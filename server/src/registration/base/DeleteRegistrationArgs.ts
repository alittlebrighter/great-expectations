import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationWhereUniqueInput } from "./RegistrationWhereUniqueInput";

@ArgsType()
class DeleteRegistrationArgs {
  @Field(() => RegistrationWhereUniqueInput, { nullable: false })
  where!: RegistrationWhereUniqueInput;
}

export { DeleteRegistrationArgs };
