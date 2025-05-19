import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CriarEventoDto } from 'src/dto/criar-evento.dto';
import { AtualizarEventoDto } from 'src/dto/atualizar-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  criar(@Body() dto: CriarEventoDto) {
    return this.eventosService.criar(dto);
  }

  @Get()
  listarTodos() {
    return this.eventosService.listarTodos();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.eventosService.buscarPorId(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dto: AtualizarEventoDto) {
    return this.eventosService.atualizar(+id, dto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.eventosService.remover(+id);
  }
}
