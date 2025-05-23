import { VendaProdutoDto } from "./venda-produto.dto";

export class VendaDto {
  usuarioId: number;
  clienteId: number;
  data: Date;
  observacoes?: string;
  produtos: VendaProdutoDto[];
}