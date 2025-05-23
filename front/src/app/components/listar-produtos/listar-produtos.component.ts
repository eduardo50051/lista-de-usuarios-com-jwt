import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/interfaces/IProdutos';
import { ProdutosService } from 'src/app/services/produtos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss']
})
export class ListarProdutosComponent implements OnInit{

  produtos: IProduto[] = [];

tipoUsuario: string | null = null;

  constructor(private produtoService: ProdutosService, private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.tipoUsuario = this.usuarioService.usuarioTipo();
    this.carregarProdutos();
  }

  async carregarProdutos (): Promise<void> {
    
    try {
      this.produtos = await this.produtoService.listarProdutos();

    } catch (erro) {
      console.log(erro)
    }

  }





}
