import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ILogin } from 'src/app/interfaces/Ilogin';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  dadosLogin: ILogin = {
    email: '',
    senha: ''
  };
  


constructor (private usuarioService: UsuarioService, private router:Router, public toastr: ToastrService){}

async Entrar(){
  try{
    await this.usuarioService.Entrar(this.dadosLogin);
    console.log()
    this.router.navigate(['/home']);
  }catch(error){
    alert(error)
  }
}


}
