import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutoDto } from 'src/dto/produto.dto';
import { ParseIntPipe } from '@nestjs/common';


@Controller('produtos')
export class ProdutosController {

    constructor(private produtosService: ProdutosService){}

    @Post()
    criarProduto(@Body() dto: ProdutoDto){
        return this.produtosService.criarProduto(dto)
    }

    @Get()
    listarPodutos(){
        return this.produtosService.listarProdutos();
    }

    @Get(':id')
    listarProdutosPorId(@Param('id', ParseIntPipe) id: number){
        return this.produtosService.listarProdutoPorId(id);
    }

    @Put(':id')
    atualizarProduto(@Param('id', ParseIntPipe) id: number, @Body() dto: ProdutoDto){
        return this.produtosService.atualizarProduto({
            where: {id},
            data: dto
        })
    }

    @Delete(':id')
    deletarProduto(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.deletarProduto({id});
    }






}
