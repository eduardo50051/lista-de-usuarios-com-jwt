import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaDto } from 'src/dto/venda.dto';

@Controller('venda')
export class VendaController {

    constructor(private vendaService: VendaService) {}

    @Post()
    async criarVenda(@Body() dto: VendaDto){
        return this.vendaService.criarVenda(dto)
    }

    @Get()
    async listarVendas(){
        return this.vendaService.listarVendas();
    }

     @Get(':id')
    listarVendaPorId(@Param('id', ParseIntPipe) id: number){
        return this.vendaService.listarVendasPorId(id);
    }

    @Put(':id')
    atualizarVenda(@Param('id', ParseIntPipe) id: number, @Body() dto: VendaDto){
        return this.vendaService.atualizarVenda(id, dto);
    }

    @Delete(':id')
    deletarVenda(@Param('id', ParseIntPipe) id: number) {
        return this.vendaService.apagarVenda(id);
    }

}
