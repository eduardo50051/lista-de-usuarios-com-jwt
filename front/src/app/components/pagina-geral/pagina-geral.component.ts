import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-geral',
  templateUrl: './pagina-geral.component.html',
  styleUrls: ['./pagina-geral.component.scss']
})
export class PaginaGeralComponent {

constructor (private usuarioService: UsuarioService, private router: Router){}

usuario: IUsuario = {
  email: '',
  senha: '',
  nome: '',
  criado_em: new Date,
};

    Sair(): void{
      this.usuarioService.Sair();
      this.router.navigate(['/login']);
    }

}
