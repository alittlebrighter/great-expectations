import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassRunWhereUniqueInput } from "../../classRun/base/ClassRunWhereUniqueInput";
import { ValidateNested, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { StudentProfileWhereUniqueInput } from "../../studentProfile/base/StudentProfileWhereUniqueInput";
@InputType()
class RegistrationCreateInput {
  @ApiProperty({
    required: true,
    type: ClassRunWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ClassRunWhereUniqueInput)
  @Field(() => ClassRunWhereUniqueInput)
  classRun!: ClassRunWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  paid?: number | null;
  @ApiProperty({
    required: false,
    type: StudentProfileWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => StudentProfileWhereUniqueInput)
  @IsOptional()
  @Field(() => StudentProfileWhereUniqueInput, {
    nullable: true,
  })
  student?: StudentProfileWhereUniqueInput | null;
}
export { RegistrationCreateInput };
