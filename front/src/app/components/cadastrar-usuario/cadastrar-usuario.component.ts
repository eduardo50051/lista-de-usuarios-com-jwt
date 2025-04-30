import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  async ciarUsuario() {
   
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais');
      return;
    }
 

    const novoUsuario: IUsuario = {
      email: this.email,
      senha: this.senha 
    };
  
    try {
      
      const usuarioCriado = await this.usuarioService.criarUsuario(novoUsuario);
      console.log(usuarioCriado);
     

      this.router.navigate(['/listar-usuarios']);
    } catch (error) {
      console.error(error);
    }
  }




}
