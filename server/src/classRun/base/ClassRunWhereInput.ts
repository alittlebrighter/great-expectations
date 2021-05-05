import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassWhereUniqueInput } from "../../class/base/ClassWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import {
  ValidateNested,
  IsOptional,
  IsNumber,
  IsDate,
  IsString,
  IsInt,
} from "class-validator";
import { SessionWhereUniqueInput } from "../../session/base/SessionWhereUniqueInput";
@InputType()
class ClassRunWhereInput {
  @ApiProperty({
    required: false,
    type: ClassWhereUniqueInput,
  })
  @Transform(JSON.parse)
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
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  maxGrade?: number;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  minGrade?: number;
  @ApiProperty({
    required: false,
    type: SessionWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => SessionWhereUniqueInput)
  @IsOptional()
  @Field(() => SessionWhereUniqueInput, {
    nullable: true,
  })
  session?: SessionWhereUniqueInput;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
}
export { ClassRunWhereInput };
