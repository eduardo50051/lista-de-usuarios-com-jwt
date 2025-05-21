export class CriarEventoDto {
  nome: string;
  descricao: string;
  data: string;
  participantes: {
    id: number;
    observacao?: string;
  }[];
}
