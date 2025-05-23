import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-geral',
  templateUrl: './pagina-geral.component.html',
  styleUrls: ['./pagina-geral.component.scss']
})
export class PaginaGeralComponent implements OnInit{

constructor (private usuarioService: UsuarioService, private router: Router){}

tipoUsuario: string | null = null;

nomeUsuario: string | null = null;

usuario: IUsuario = {
  email: '',
  senha: '',
  nome: '',
  criado_em: new Date,
  
};


ngOnInit() {
  this.tipoUsuario = this.usuarioService.usuarioTipo();
  
  this.nomeUsuario = this.usuarioService.usuarioNome();
}

    Sair(): void{
      this.usuarioService.Sair();
      this.router.navigate(['/login']);
    }

}
