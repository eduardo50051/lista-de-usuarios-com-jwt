import { Injectable } from '@nestjs/common';
import { ProdutoDto } from 'src/dto/produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaClient, Produtos,  } from '@prisma/client';

@Injectable()
export class ProdutosService {

constructor(private prisma: PrismaService){}

async criarProduto(data: ProdutoDto): Promise<Produtos>{

    try {
        const evento_criado =  await this.prisma.produtos.create({
            data: {

                ...data

            },
        });
        return evento_criado;
    } catch (error) {
            console.error(error);
        throw error;
    }


}

async listarProdutos(): Promise<Produtos[]> {
    const produtos = await this.prisma.produtos.findMany();
    console.log(produtos);
    return produtos;
}

async listarProdutoPorId(id: number){
    return this.prisma.produtos.findUnique({
        where:{ id },
    });
}

async atualizarProduto(params: {where: Prisma.ProdutosWhereUniqueInput; data: ProdutoDto}): Promise<Produtos>{

    const {data, where} = params;

    try {

        const produtoAtualizado = await this.prisma.produtos.update({
            data,
            where
        });
        
        return produtoAtualizado;

    } catch (error) {
        
        console.error(error);

throw error;



    }

}


async deletarProduto(where: Prisma.ProdutosWhereUniqueInput): Promise<Produtos> {

    try {
        const usuarioDeletado = await this.prisma.produtos.delete({where});
        return usuarioDeletado;
    } catch (error) {
        console.error(error);
        throw error;
    }




}











}