import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VendaDto } from 'src/dto/venda.dto';

@Injectable()
export class VendaService {

    constructor(private prisma: PrismaService){}




  async listarVendas() {
    
     const venda = await this.prisma.venda.findMany({
      include: {
        usuario: true,
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });
 console.log(JSON.stringify(venda, null, 2));
return venda;

     
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
 
  const produtosIds = data.produtos.map(p => Number(p.produtoId));
  
  const produtosDB = await this.prisma.produtos.findMany({
    where: { id: { in: produtosIds } },
  });

  const precosMap = new Map<number, string>();
  produtosDB.forEach(p => precosMap.set(p.id, p.valor_venda));

  const produtosParaCriar = data.produtos.map(produto => {
    const produtoId = Number(produto.produtoId); 
    const preco = produto.preco_unitario ?? precosMap.get(produtoId);
    if (!preco) {
      throw new Error(`Preço não encontrado para o produto ${produtoId}`);
    }
    return {
      quantidade: produto.quantidade,
      preco_unitario: preco,
      produto: { connect: { id: produtoId } },
    };
  });

  return this.prisma.venda.create({
    data: {
      usuarioId: Number(data.usuarioId),   
      clienteId: Number(data.clienteId),   
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
  
  await this.prisma.venda.update({
    where: { id },
    data: {
      usuarioId: data.usuarioId,
      clienteId: data.clienteId,
      data: data.data ? new Date(data.data) : undefined,
      observacoes: data.observacoes,
    }
  });

 
  const produtosAtuais = await this.prisma.vendaProduto.findMany({
    where: { vendaId: id }
  });

  const idsAtuais = produtosAtuais.map(p => p.id);
  const produtosEnviados = data.produtos ?? [];

  const idsEnviados = produtosEnviados
    .filter(p => p.id !== undefined && p.id !== null)
    .map(p => p.id);

 
  const idsParaDeletar = idsAtuais.filter(idAtual => !idsEnviados.includes(idAtual));

  if (idsParaDeletar.length > 0) {
    await this.prisma.vendaProduto.deleteMany({
      where: { id: { in: idsParaDeletar } }
    });
  }

  
  for (const produto of produtosEnviados) {
    if (produto.id) {
    
      await this.prisma.vendaProduto.update({
        where: { id: produto.id },
        data: {
          produtoId: produto.produtoId,
          quantidade: produto.quantidade,
          preco_unitario: produto.preco_unitario,
        }
      });
    } else {
      
      await this.prisma.vendaProduto.create({
        data: {
          vendaId: id,
          produtoId: produto.produtoId,
          quantidade: produto.quantidade,
          preco_unitario: produto.preco_unitario ?? '',
        }
      });
    }
  }


  return this.prisma.venda.findUnique({
    where: { id },
    include: {
      produtos: {
        include: { produto: true }
      },
      usuario: true,
      cliente: true,
    }
  });
}


  async apagarVenda(id: number) {
    return this.prisma.venda.delete({
      where: { id },
    });
  }


}
