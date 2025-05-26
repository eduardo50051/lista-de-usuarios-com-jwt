import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { ActivatedRoute } from '@angular/router';
import { IVenda } from 'src/app/interfaces/IVenda';
import { IProdutoVenda } from 'src/app/interfaces/IVenda';
import { VendaService } from 'src/app/services/venda.service';
import { IProduto } from 'src/app/interfaces/IProdutos';
import { ProdutosService } from 'src/app/services/produtos.service';


@Component({
  selector: 'app-criar-venda',
  templateUrl: './criar-venda.component.html',
  styleUrls: ['./criar-venda.component.scss']
})
export class CriarVendaComponent implements OnInit{

  vendaId: number = 0;

produtos: IProduto[] = [];



 usuariosVendedores: IUsuario[] = [];
  usuariosClientes: IUsuario[] = [];

venda: IVenda = {
    usuarioId: 0,
    clienteId: 0,
    data: '',
    observacoes: '',
    produtos: []
  };

produtoSelecionado: IProdutoVenda = this.novoProduto();
editandoProdutoIndex: number = -1;

  constructor(
    private usuarioService: UsuarioService, 
    private vendaService: VendaService, 
    private route: ActivatedRoute, 
    private produtoService:ProdutosService
  ) {}

  async ngOnInit(): Promise<void> {
    const idUrl = this.route.snapshot.paramMap.get('id');
    this.vendaId = idUrl ? Number(idUrl) : 0;

    await this.carregarUsuarios();
    await this.listarProdutos();

    if (this.vendaId !== 0){
      await this.carregarVenda(this.vendaId);
    }

  }


async carregarUsuarios(): Promise<void> {
    try {
      const todosUsuarios: IUsuario[] = await this.usuarioService.listarTodos();

      this.usuariosVendedores = todosUsuarios.filter(u => u.tipoUsuarioId === 1); 
      this.usuariosClientes = todosUsuarios.filter(u => u.tipoUsuarioId === 2); 
    } catch (error) {
      console.error(error);
    }
  }

 async carregarVenda(id: number): Promise<void> {
    try {
      const venda = await this.vendaService.listarVendasPorId(id);

      this.venda = {
        ...venda,
        data: typeof venda.data === 'string' ? venda.data.split('T')[0] : venda.data
      };
    } catch (error) {
      console.error('Erro ao carregar venda', error);
    }
  }

async listarProdutos(): Promise<void> {
  try {
    this.produtos = await this.produtoService.listarProdutos(); 
  } catch (error) {
    console.error('Erro ao carregar produtos', error);
  }
}










inserirProduto(): void {
  if (!this.produtoSelecionado.produtoId || !this.produtoSelecionado.quantidade) {
    alert('Preencha o produto e a quantidade!');
    return;
  }

  if (!this.produtoSelecionado.preco_unitario || this.produtoSelecionado.preco_unitario.trim() === '') {
    const produto = this.produtos.find(p => p.id === this.produtoSelecionado.produtoId);

    if (produto && produto.valor_venda) {
      this.produtoSelecionado.preco_unitario = produto.valor_venda;
    } else {
      alert('Produto não encontrado ou valor de venda inválido.');
      return;
    }
  }

  if (this.editandoProdutoIndex === -1) {
    this.venda.produtos.push({ ...this.produtoSelecionado });
  } else {
    this.venda.produtos[this.editandoProdutoIndex] = { ...this.produtoSelecionado };
    this.editandoProdutoIndex = -1;
  }

  this.produtoSelecionado = this.novoProduto();
}




editarProduto(index: number): void {
  this.editandoProdutoIndex = index;
  this.produtoSelecionado = { ...this.venda.produtos[index] };
}

removerProduto(index: number): void {
  this.venda.produtos.splice(index, 1);
}

getNomeProduto(id: number): string {
  const produto = this.produtos.find(p => p.id === id);
  return produto?.nome ?? ''; 
}


calcularTotalProduto(produto: IProdutoVenda): number {
  const preco = parseFloat(produto.preco_unitario || '0');
  return preco * produto.quantidade;
}

async criarVenda(): Promise<void> {
  try {
    await this.vendaService.criarVenda(this.venda);
    alert('Venda criada com sucesso!');
    
  
    this.venda = {
      usuarioId: null,
      clienteId: null,
      data: '',
      observacoes: '',
      produtos: []
    };
    this.produtoSelecionado = this.novoProduto();
    this.editandoProdutoIndex = -1;
    
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    
  }
}


novoProduto(): IProdutoVenda {
  return {
    produtoId: null,
    quantidade: 1,
    preco_unitario: ''
  };
}



async atualizarVenda(): Promise<void> {
  try {
  
    await this.vendaService.atualizarVenda(this.venda.id!, this.venda); 
    alert('Venda atualizada com sucesso!');

    this.venda = {
      usuarioId: null,
      clienteId: null,
      data: '',
      observacoes: '',
      produtos: []
    };
    this.produtoSelecionado = this.novoProduto();
    this.editandoProdutoIndex = -1;

  } catch (error) {
    console.error('Erro ao atualizar venda:', error);
  }
}



}
