import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ChecksService } from './checks.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
import { AuthGuard } from '@nestjs/passport';
import { IextendedRequest } from '../shared/interfaces/extendedRequest.inteface';
import { Check } from './entities/check.entity';
import { Ireport } from 'src/shared/interfaces/report.interface';

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
  async findAll(@Request() req: IextendedRequest): Promise<Check[]> {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckDto: UpdateCheckDto) {
    return this.checksService.update(+id, updateCheckDto);
  }

  @HttpCode(204)
  @Delete(':checkId')
  remove(
    @Param('checkId') checkId: string,
    @Request() req: IextendedRequest,
  ): Promise<void> {
    return this.checksService.remove(checkId, req.user);
  }
}
