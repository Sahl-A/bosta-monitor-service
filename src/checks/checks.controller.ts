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
} from '@nestjs/common';
import { ChecksService } from './checks.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
import { AuthGuard } from '@nestjs/passport';
import { IextendedRequest } from '../shared/interfaces/extendedRequest.inteface';
import { Check } from './entities/check.entity';

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
  findAll(@Request() req: IextendedRequest): Promise<Check[]> {
    return this.checksService.findAll(req.user);
  }

  @Get(':postid')
  findOne(@Param('postid') postid: string) {
    return this.checksService.findOne(postid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckDto: UpdateCheckDto) {
    return this.checksService.update(+id, updateCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checksService.remove(+id);
  }
}
