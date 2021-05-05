import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ClassRunWhereUniqueInput } from "../../classRun/base/ClassRunWhereUniqueInput";
import {
  ValidateNested,
  IsDate,
  IsString,
  IsNumber,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { StudentProfileWhereUniqueInput } from "../../studentProfile/base/StudentProfileWhereUniqueInput";
@ObjectType()
class Registration {
  @ApiProperty({
    required: true,
    type: ClassRunWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ClassRunWhereUniqueInput)
  classRun?: ClassRunWhereUniqueInput;
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
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  paid!: number | null;
  @ApiProperty({
    required: false,
    type: StudentProfileWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => StudentProfileWhereUniqueInput)
  @IsOptional()
  student?: StudentProfileWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Registration };
