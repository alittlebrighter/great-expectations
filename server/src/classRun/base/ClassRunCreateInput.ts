import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassWhereUniqueInput } from "../../class/base/ClassWhereUniqueInput";
import { ValidateNested, IsNumber, IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { SessionWhereUniqueInput } from "../../session/base/SessionWhereUniqueInput";
@InputType()
class ClassRunCreateInput {
  @ApiProperty({
    required: true,
    type: ClassWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ClassWhereUniqueInput)
  @Field(() => ClassWhereUniqueInput)
  class!: ClassWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  cost!: number;
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
    required: true,
    type: SessionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SessionWhereUniqueInput)
  @Field(() => SessionWhereUniqueInput)
  session!: SessionWhereUniqueInput;
}
export { ClassRunCreateInput };
