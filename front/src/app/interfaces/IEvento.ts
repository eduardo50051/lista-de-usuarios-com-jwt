export interface IEvento {
  id?: number;
  nome: string;
  descricao: string;
  data: Date | string;
  dataFormatada?: string;
  participantes?: { id: number; observacao?: string }[];
  participacoes?: IParticipante[];
}


export interface IParticipante {
  id: number;
  eventoId: number;
  usuarioId: number;
  observacao?: string;
  usuario: {
    id: number;
    nome: string | null;
    email: string;
  };
}