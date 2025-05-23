import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IEvento } from 'src/app/interfaces/IEvento';

declare var bootstrap: any;

@Component({
  selector: 'app-evento-listar',
  templateUrl: './evento-listar.component.html',
  styleUrls: ['./evento-listar.component.scss']
})
export class EventoListarComponent implements OnInit {
  eventos: IEvento[] = [];

tipoUsuario: string | null = null;

  private modalInstance: any;
  participantesModal: any[] = [];
  constructor(private eventosService: EventosService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarEventos();
    this.tipoUsuario = this.usuarioService.usuarioTipo();
  }

async carregarEventos(): Promise<void> {
  try {
    this.eventos = await this.eventosService.listarEventos();

    this.eventos = this.eventos.map(evento => ({
      ...evento,
      dataFormatada: this.formatarData(evento.data)
    }));
  } catch (erro) {
    console.error('Erro ao buscar eventos:', erro);
  }
}




abrirModalParticipantes(evento: IEvento): void {
    this.participantesModal = evento.participacoes || [];

    
    if (!this.modalInstance) {
      const modalEl = document.getElementById('participantesModal');
      this.modalInstance = new bootstrap.Modal(modalEl);
    }
    this.modalInstance.show();
  }

  editarEvento(id: number): void {
    console.log('Editar evento ID:', id);
  
  }

formatarData(data: string | Date): string {
  if (!data) return '';

  
  const dataObj = typeof data === 'string' ? new Date(data) : data;

  return dataObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
   
  });
}




}



