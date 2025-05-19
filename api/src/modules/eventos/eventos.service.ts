import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarEventoDto } from 'src/dto/criar-evento.dto';
import { AtualizarEventoDto } from 'src/dto/atualizar-evento.dto';

@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) {}

  async criar(dados: CriarEventoDto) {
    return this.prisma.evento.create({
      data: {
        nome: dados.nome,
        descricao: dados.descricao,
        data: new Date(dados.data),
        participacoes: {
          create: dados.participantesIds.map(id => ({
            usuario: { connect: { id } }
          }))
        }
      },
      include: {
        participacoes: {
          include: { usuario: true }
        }
      }
    });
  }

  async listarTodos() {
    return this.prisma.evento.findMany({
      include: {
        participacoes: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                email: true
              }
            }
          }
        }
      }
    });
  }

  async buscarPorId(id: number) {
    return this.prisma.evento.findUnique({
      where: { id },
      include: {
        participacoes: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                email: true
              }
            }
          }
        }
      }
    });
  }

  async atualizar(id: number, dados: AtualizarEventoDto) {
    return this.prisma.evento.update({
      where: { id },
      data: {
        nome: dados.nome,
        descricao: dados.descricao,
        data: dados.data ? new Date(dados.data) : undefined,
        participacoes: dados.participantesIds
          ? {
              deleteMany: {}, 
              create: dados.participantesIds.map(id => ({
                usuario: { connect: { id } }
              }))
            }
          : undefined
      },
      include: {
        participacoes: {
          include: { usuario: true }
        }
      }
    });
  }

  async remover(id: number) {
    return this.prisma.evento.delete({
      where: { id }
    });
  }
}
