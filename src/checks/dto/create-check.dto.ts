import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPort,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Authentication {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

export class CreateCheckDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsIn(['http', 'https', 'tcp'])
  protocol: string;

  @IsOptional()
  path?: string;

  @IsOptional()
  @IsPort()
  port?: number;

  @IsOptional()
  @IsString()
  webhook?: string;

  @IsOptional()
  @IsNumber()
  timeout?: number;

  @IsOptional()
  @IsNumber()
  interval?: number;

  @IsOptional()
  @IsNumber()
  threshold?: number;

  @IsOptional()
  // @IsObject()
  @ValidateNested()
  @Type(() => Authentication)
  authentication?: Authentication;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  ignore_ssl?: boolean;
}
