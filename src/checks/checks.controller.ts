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
import { IextendedRequest } from 'src/shared/interfaces/extendedRequest.inteface';

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
  findAll() {
    return this.checksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checksService.findOne(+id);
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
