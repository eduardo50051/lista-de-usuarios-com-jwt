export interface IProdutoVenda {
  id?: number; 
  produtoId: number;
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
  usuarioId: number;
  clienteId: number;
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
