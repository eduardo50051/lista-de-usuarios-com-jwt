import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { AtualizarUsuarioDto } from 'src/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/dto/criar-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(private prisma: PrismaService) {}

    async criarUsuario(data: CriarUsuarioDto): Promise<Usuario> {
        console.log('Tentando criar usuário com dados:', data);

        try {
            const usuarioExistente = await this.prisma.usuario.findUnique({
                where: { email: data.email }
            });

            if (usuarioExistente) {
                console.warn('Usuário já existe com e-mail:', data.email);
                throw new ConflictException('esse usuario ja esta cadastrado');
            }

            const senhaEncriptada = await bcrypt.hash(data.senha, 10);
            const usuarioCriado = await this.prisma.usuario.create({
                data: {
                    ...data,
                    senha: senhaEncriptada,
                    
                },
            });

            console.log('Usuário criado com sucesso:', usuarioCriado);
            return usuarioCriado;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    async listarUsuarios(): Promise<Usuario[]> {
        try {
            const usuarios = await this.prisma.usuario.findMany();
            console.log('Usuários encontrados:', usuarios.length);
            return usuarios;
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
    }

    async listarUsuarioPorId(
        usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput
      ): Promise<Prisma.UsuarioGetPayload<{ include: { tipoUsuario: true } }>> {
        console.log('Buscando usuário com:', usuarioWhereUniqueInput);
      
        try {
          const usuario = await this.prisma.usuario.findUnique({
            where: usuarioWhereUniqueInput,
            include: {
              tipoUsuario: true,
            },
          });
      
          if (!usuario) {
            console.warn('Usuário não encontrado:', usuarioWhereUniqueInput);
            throw new NotFoundException('Usuário não existe');
          }
      
          console.log('Usuário encontrado:', usuario);
          return usuario;
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          throw error;
        }
      }

    async atualizarUsuario(params: { where: Prisma.UsuarioWhereUniqueInput; data: AtualizarUsuarioDto }): Promise<Usuario> {
        const { data, where } = params;
        console.log('Tentando atualizar usuário:', where);

        try {
            const usuario = await this.prisma.usuario.findUnique({ where });
            if (!usuario) {
                console.warn('Usuário para atualização não encontrado:', where);
                throw new NotFoundException('Usuário não existe');
            }

            if (data.senha) {
                const senhaEncriptada = await bcrypt.hash(data.senha, 10);
                data.senha = senhaEncriptada;
            }

            const usuarioAtualizado = await this.prisma.usuario.update({
                data,
                where,
            });

            console.log('Usuário atualizado com sucesso:', usuarioAtualizado);
            return usuarioAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    async deletarUsuario(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
        console.log(where);

        try {

            if (where.id && typeof where.id === 'string'){
                where.id = parseInt(where.id, 10);
            }

            const usuario = await this.prisma.usuario.findUnique({ where });
            if (!usuario) {
                console.warn('Usuário para exclusão não encontrado:', where);
                throw new NotFoundException('Usuário não existe');
            }

            const usuarioDeletado = await this.prisma.usuario.delete({ where });
            console.log('Usuário deletado com sucesso:', usuarioDeletado);
            return usuarioDeletado;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }
}
