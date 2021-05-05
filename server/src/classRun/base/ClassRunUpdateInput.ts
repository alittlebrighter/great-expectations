import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassWhereUniqueInput } from "../../class/base/ClassWhereUniqueInput";
import { ValidateNested, IsOptional, IsNumber, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { SessionWhereUniqueInput } from "../../session/base/SessionWhereUniqueInput";
@InputType()
class ClassRunUpdateInput {
  @ApiProperty({
    required: false,
    type: ClassWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ClassWhereUniqueInput)
  @IsOptional()
  @Field(() => ClassWhereUniqueInput, {
    nullable: true,
  })
  class?: ClassWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  cost?: number;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  maxGrade?: number | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  minGrade?: number | null;
  @ApiProperty({
    required: false,
    type: SessionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SessionWhereUniqueInput)
  @IsOptional()
  @Field(() => SessionWhereUniqueInput, {
    nullable: true,
  })
  session?: SessionWhereUniqueInput;
}
export { ClassRunUpdateInput };
