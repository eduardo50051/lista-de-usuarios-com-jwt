export interface IProdutoVenda {
  id?: number; 
  produtoId: number | null;
  quantidade: number;
  preco_unitario?: string;
  produto?: {
    id: number;
    nome: string;
    valor_venda: string;
  };
}

export interface IVenda {
  id?: number;
  usuarioId: number | null;
  clienteId: number | null;
  data: string | Date;
  observacoes?: string;
  produtos: IProdutoVenda[];
  usuario?: {
    id: number;
    nome: string;
  };
  cliente?: {
    id: number;
    nome: string;
  };
}
