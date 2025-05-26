import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduto } from 'src/app/interfaces/IProdutos';
import { ProdutosService } from 'src/app/services/produtos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-criar-produto',
  templateUrl: './editar-criar-produto.component.html',
  styleUrls: ['./editar-criar-produto.component.scss']
})
export class EditarCriarProdutoComponent implements OnInit{
 
   produto: IProduto = {
    id: 0,
    nome: '',
    valor_venda: '',
    
  };

  constructor (
     private route: ActivatedRoute,
        private produtoService: ProdutosService,
        private router: Router,
        private toastr: ToastrService
  ){}

  ngOnInit() {
     const produtoId = this.route.snapshot.paramMap.get('id'); 
    if (produtoId && produtoId !== '0') {
      this.listarProdutoId(Number(produtoId));
    }
  }

   async listarProdutoId(id: number): Promise<void> {
    try {
      this.produto = await this.produtoService.listarProdutosId(id);
    } catch (error) {
      console.log(error);
    }
  }


  async criarProduto(){
  if (this.produto){
    const payload = {
      nome: this.produto.nome,
      valor_venda: this.limparValor(this.produto.valor_venda ?? '').toString(), 

    }

    try {
      await this.produtoService.criarProduto(payload);
      this.toastr.success('produto criado');
      this.router.navigate(['listar-produtos']);
    } catch (error: any) {
      console.error(error);
      this.toastr.error('erro ao cadastrar produto')
    }
  }
}


async salvarProduto(){
  await this.produtoService.atualizarProduto(this.produto.id!, {
    nome: this.produto.nome,
    valor_venda: this.limparValor(this.produto.valor_venda ?? '').toString(), 
  });

  this.toastr.success('Produto atualizado com sucesso');
  this.router.navigate(['listar-produtos']);
}







  async excluirProduto(): Promise<void> {

    const produtoId = this.route.snapshot.paramMap.get('id');

    if (!produtoId){
      return;
    }

      const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed){
      try {
        await this.produtoService.deletarProduto(Number(produtoId));
        this.toastr.success('produto apagado');
        this.router.navigate(['listar-produtos']);
      } catch (error:any) {
        
        console.error(error)

      

      }
    }

  }



  private limparValor(valor: string): number {
  if (!valor) return 0;

  return parseFloat(
    valor
      .replace(/\s/g, '')    
      .replace('R$', '')      
      .replace(/\./g, '')     
      .replace(',', '.')      
  );
}


}
