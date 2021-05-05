import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassRunWhereUniqueInput } from "../../classRun/base/ClassRunWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsString,
  IsNumber,
} from "class-validator";
import { StudentProfileWhereUniqueInput } from "../../studentProfile/base/StudentProfileWhereUniqueInput";
@InputType()
class RegistrationWhereInput {
  @ApiProperty({
    required: false,
    type: ClassRunWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => ClassRunWhereUniqueInput)
  @IsOptional()
  @Field(() => ClassRunWhereUniqueInput, {
    nullable: true,
  })
  classRun?: ClassRunWhereUniqueInput;
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
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  paid?: number;
  @ApiProperty({
    required: false,
    type: StudentProfileWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => StudentProfileWhereUniqueInput)
  @IsOptional()
  @Field(() => StudentProfileWhereUniqueInput, {
    nullable: true,
  })
  student?: StudentProfileWhereUniqueInput;
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
export { RegistrationWhereInput };
