import { Component, OnInit } from '@angular/core';
import { IEvento } from 'src/app/interfaces/IEvento';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private eventoService: EventosService){}

tipoUsuario: string | null = null;

usuarioId: number | null = null;

nomeUsuario: string | null = null;



eventosUsuario: IEvento[] | null = null;

ngOnInit(): void {
   this.tipoUsuario = this.usuarioService.usuarioTipo();
   this.usuarioId = this.usuarioService.usuarioId();
  this.nomeUsuario = this.usuarioService.usuarioNome();
  this.listarEventosUsuario(this.usuarioId!);
}

  async listarEventosUsuario(id: number): Promise<void> {
    try {
      this.eventosUsuario = await this.eventoService.listarEventosPorUsuario(this.usuarioId!);
    } catch (error) {
      console.log(error);
    }
  }



}
