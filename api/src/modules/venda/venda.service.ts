import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VendaDto } from 'src/dto/venda.dto';

@Injectable()
export class VendaService {

    constructor(private prisma: PrismaService){}




  async listarVendas() {
    return this.prisma.venda.findMany({
      include: {
        usuario: true,
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });
  }

  async listarVendasPorId(id: number) {
    return this.prisma.venda.findUnique({
      where: { id },
      include: {
        usuario: true,
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });
  }

  async criarVenda(data: VendaDto) {
  const produtosIds = data.produtos.map(p => p.produtoId);
  const produtosDB = await this.prisma.produtos.findMany({
    where: { id: { in: produtosIds } },
  });
  const precosMap = new Map<number, string>();
  produtosDB.forEach(p => precosMap.set(p.id, p.valor_venda));

  const produtosParaCriar = data.produtos.map(produto => {
    const preco = produto.preco_unitario ?? precosMap.get(produto.produtoId);
    if (!preco) {
      throw new Error(`Preço não encontrado para o produto ${produto.produtoId}`);
    }
    return {
      quantidade: produto.quantidade,
      preco_unitario: preco,
      produto: { connect: { id: produto.produtoId } },
    };
  });

  return this.prisma.venda.create({
    data: {
      usuarioId: data.usuarioId,
      clienteId: data.clienteId,
      data: new Date(data.data),
      observacoes: data.observacoes,
      produtos: {
        create: produtosParaCriar,
      },
    },
    include: {
      produtos: {
        include: { produto: true },
      },
      usuario: true,
      cliente: true,
    },
  });
}


  async atualizarVenda(id: number, data: Partial<VendaDto>) {
    return this.prisma.venda.update({
      where: { id },
      data: {
        usuarioId: data.usuarioId,
        clienteId: data.clienteId,
        data: data.data ? new Date(data.data) : undefined,
        observacoes: data.observacoes,
      },
      include: {
        produtos: {
          include: { produto: true },
        },
        usuario: true,
        cliente: true,
      },
    });
  }

  async apagarVenda(id: number) {
    return this.prisma.venda.delete({
      where: { id },
    });
  }


}
