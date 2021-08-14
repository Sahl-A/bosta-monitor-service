import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsPort,
  IsString,
  IsUrl,
} from 'class-validator';

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
  @IsObject()
  @IsString({ each: true })
  authentication?: { username: string; password: string };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  ignore_ssl?: boolean;
}
