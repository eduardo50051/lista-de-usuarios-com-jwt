import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {

  constructor(private usuarioService: UsuarioService, private router: Router, private toastr: ToastrService) {}

  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  async ciarUsuario() {
   
    if (this.senha !== this.confirmarSenha) {
      this.toastr.error('as senhas nao sao iguais');
      return;
    }
 

    const novoUsuario: IUsuario = {
      email: this.email,
      senha: this.senha,
      tipo: 2,
    };
  
    try {
      const usuarioCriado = await this.usuarioService.criarUsuario(novoUsuario);
      console.log(usuarioCriado);
      
      this.toastr.success('usuario');
      this.router.navigate(['/listar-usuarios']);
    } catch (error: any) {
      
      
      const mensagemErro = error?.response?.data?.message || 'erro ao criar usuario';
      this.toastr.error(mensagemErro, 'Erro');
    }
    
    
    
    
  }




}
