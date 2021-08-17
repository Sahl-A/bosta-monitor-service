import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ChecksService } from './checks.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { AuthGuard } from '@nestjs/passport';
import { IextendedRequest } from '../shared/interfaces/extendedRequest.inteface';
import { Check } from './entities/check.entity';
import { Ireport } from '../shared/interfaces/report.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('checks')
export class ChecksController {
  constructor(private readonly checksService: ChecksService) {}

  @Post()
  async create(
    @Body() createCheckDto: CreateCheckDto,
    @Request() req: IextendedRequest,
  ): Promise<string> {
    return await this.checksService.create(req.user, createCheckDto);
  }

  @Get()
  async findAll(
    @Request() req: IextendedRequest,
  ): Promise<{ checksCount: number; checks: Check[] }> {
    return await this.checksService.findAll(req.user);
  }

  @Get(':checkId/reports')
  async getReports(
    @Param('checkId') checkId: string,
    @Request() req: IextendedRequest,
  ): Promise<Ireport> {
    const reports = await this.checksService.getCheckReport(req.user, checkId);
    return reports;
  }

  @Get(':checkId')
  async findOne(
    @Param('checkId') checkId: string,
    @Request() req: IextendedRequest,
  ): Promise<Check> {
    return await this.checksService.findOne(checkId, req.user);
  }

  @HttpCode(204)
  @Delete(':checkId')
  async remove(
    @Param('checkId') checkId: string,
    @Request() req: IextendedRequest,
  ): Promise<void> {
    await this.checksService.remove(checkId, req.user);
  }
}
