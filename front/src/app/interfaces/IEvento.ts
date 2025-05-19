export interface IEvento {
id?: number,
  nome: string;
  descricao: string;
  data: Date | string; 
  participantesIds?: number[];
  dataFormatada?: string;
  participacoes?: IParticipante[];
}

export interface IParticipante {
  id: number;
  eventoId: number;
  usuarioId: number;
  usuario: {
    id: number;
    nome: string | null;
    email: string;
  };
}