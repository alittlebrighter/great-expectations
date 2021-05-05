import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassWhereUniqueInput } from "../../class/base/ClassWhereUniqueInput";
import {
  ValidateNested,
  IsNumber,
  IsDate,
  IsString,
  IsInt,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { SessionWhereUniqueInput } from "../../session/base/SessionWhereUniqueInput";
@ObjectType()
class ClassRun {
  @ApiProperty({
    required: true,
    type: ClassWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ClassWhereUniqueInput)
  class?: ClassWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  cost!: number;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  maxGrade!: number | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  minGrade!: number | null;
  @ApiProperty({
    required: true,
    type: SessionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SessionWhereUniqueInput)
  session?: SessionWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { ClassRun };
