export interface IUsuario {
    id?: number;
    email: string;
    senha?: string;
    nome?: string;
    criado_em?: Date;
    tipoUsuarioId?: number;
}