export class AtualizarEventoDto {
  nome?: string;
  descricao?: string;
  data?: Date;
    participantes: {
    id: number;
    observacao?: string;
  }[];
}
