
export interface IUsuario {
  id?: number;
  nome?: string | null;
  email?: string;
}

export interface IParticipacao {
  id: number;
  eventoId: number;
  usuarioId: number;
  observacao?: string;
  usuario?: IUsuario;
}

export interface IEventoDetalhado {
  id: number;
  nome: string;
  descricao: string;
  data: Date | string;
  participacoes: IParticipacao[];
}
