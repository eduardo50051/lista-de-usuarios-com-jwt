import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventoDetalhado } from 'src/app/interfaces/IEventoDetalhes';
import { UsuarioService } from 'src/app/services/usuario.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-evento-editar-criar',
  templateUrl: './evento-editar-criar.component.html',
  styleUrls: ['./evento-editar-criar.component.scss']
})
export class EventoEditarCriarComponent implements OnInit{

   evento: IEventoDetalhado | null = null;
  usuarios: IUsuario[] = [];
  participantesSelecionados: Set<number> = new Set();

observacoesMap: Map<number, string> = new Map();


  constructor(private eventosService: EventosService, private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

async ngOnInit() {
  const eventoId = this.route.snapshot.paramMap.get('id');

  
  this.usuarios = await this.usuarioService.listarTodos();


if (eventoId && eventoId !== '0') {
  const id = Number(eventoId);
  this.evento = await this.eventosService.listarEventoPorId(id);

  this.evento.participacoes.forEach(part => {
    this.participantesSelecionados.add(part.usuarioId);
    this.observacoesMap.set(part.usuarioId, part.observacao || '');
  });
} else {
  this.evento = {
    id: 0,
    nome: '',
    descricao: '',
    data: '',
    participacoes: []
  };
  this.participantesSelecionados.clear();
  this.observacoesMap.clear(); 
}

}


  async listarEventoPorId(id: number): Promise<void> {
   
    try{
      this.evento = await this.eventosService.listarEventoPorId(id);
      
    }catch (error){
      console.log(error)
    }


    
  }


get dataFormatada(): string | null {
  if (!this.evento?.data) return null;

  const data = new Date(this.evento.data);

  
  return data.toISOString().slice(0, 10);
}

set dataFormatada(valor: string | null) {
  if (this.evento) {
   
    this.evento.data = valor ? new Date(valor + 'T00:00:00').toISOString() : '';
  }
}



async criarEvento() {
  if (this.evento) {
    const payload = {
      nome: this.evento.nome,
      descricao: this.evento.descricao,
      data: this.evento.data,
      participantes: Array.from(this.participantesSelecionados).map(id => ({
        id,
        observacao: this.observacoesMap.get(id) || ''
      }))
    };

    try {
      await this.eventosService.criarEvento(payload);
      alert('Evento criado com sucesso!');
      this.router.navigate(['/listar-eventos']);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao criar o evento.');
    }
  }
}


getObservacao(usuarioId: number): string {
  return this.observacoesMap.get(usuarioId) || '';
}

setObservacao(usuarioId: number, valor: string): void {
  this.observacoesMap.set(usuarioId, valor);
}



 selecionarParticipantes(usuarioId: number) {
  if (this.participantesSelecionados.has(usuarioId)) {
    this.participantesSelecionados.delete(usuarioId);
    this.observacoesMap.delete(usuarioId); 
  } else {
    this.participantesSelecionados.add(usuarioId);
    if (!this.observacoesMap.has(usuarioId)) {
      this.observacoesMap.set(usuarioId, '');
    }
  }
}


async salvarEvento() {
  if (this.evento) {
    await this.eventosService.atualizarEvento(this.evento.id, {
      nome: this.evento.nome,
      descricao: this.evento.descricao,
      data: this.evento.data,
      participantes: Array.from(this.participantesSelecionados).map(id => ({
        id,
        observacao: this.observacoesMap.get(id) || ''
      }))
    });

    this.toastr.success('usuario');
    this.router.navigate(['/listar-eventos']);
  }
}



async excluirEvento(): Promise<void> {
  if (this.evento && this.evento.id > 0) {
    const confirmar = confirm('Tem certeza que deseja excluir este evento?');

    if (confirmar) {
      try {
        await this.eventosService.deletarEvento(this.evento.id);
        alert('Evento excluído com sucesso!');
        this.router.navigate(['/listar-eventos']); 
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
        alert('Erro ao excluir o evento.');
      }
    }
  }
}





}
