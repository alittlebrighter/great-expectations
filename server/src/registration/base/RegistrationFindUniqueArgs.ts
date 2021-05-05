import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationWhereUniqueInput } from "./RegistrationWhereUniqueInput";

@ArgsType()
class RegistrationFindUniqueArgs {
  @Field(() => RegistrationWhereUniqueInput, { nullable: false })
  where!: RegistrationWhereUniqueInput;
}

export { RegistrationFindUniqueArgs };
