import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/interfaces/IUsuario';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent {

  usuarios: IUsuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  async ngOnInit() {
    this.usuarios = await this.usuarioService.listarTodos();
    console.log(this.usuarios);
  }

}
