import { Component, OnInit } from '@angular/core';
import { VendaService } from 'src/app/services/venda.service';
import { IVenda } from 'src/app/interfaces/IVenda';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-venda',
  templateUrl: './listar-venda.component.html',
  styleUrls: ['./listar-venda.component.scss']
})
export class ListarVendaComponent implements OnInit{

vendas: IVenda[] = [];

tipoUsuario: string | null = null;

  constructor(private vendaService: VendaService, private usuarioService: UsuarioService){}

  ngOnInit() {
    this.tipoUsuario = this.usuarioService.usuarioTipo();
    this.carregarProdutos();
  }

  async carregarProdutos (): Promise<void> {
    
    try {
      this.vendas = await this.vendaService.listarVendas();

    } catch (erro) {
      console.log(erro)
    }

  }

  
}
