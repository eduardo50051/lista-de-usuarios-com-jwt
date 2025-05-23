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
        create: dados.participantes.map(p => ({
          observacao: p.observacao,
          usuario: { connect: { id: p.id } }
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

async listarEventosPorUsuario(usuarioId: number) {
  const usuarioComEventos = await this.prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: {
      participacoes: {
        select: { evento: true }
      }
    }
  });

  
  return usuarioComEventos?.participacoes.map(p => p.evento) || [];
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
  const evento = await this.prisma.evento.findUnique({
    where: { id },
    include: { participacoes: true }
  });

  if (!evento) {
    throw new Error(`Evento nao encontrado`);
  }

  const participacoesAtuais = evento.participacoes;
  const novasParticipacoes = dados.participantes || [];

  for (const nova of novasParticipacoes) {
    const existente = participacoesAtuais.find(
      p => p.usuarioId === nova.id && p.eventoId === id
    );

    if (existente) {
      await this.prisma.participacao.update({
        where: { id: existente.id },
        data: {
          observacao: nova.observacao
        }
      });
    } else {
      await this.prisma.participacao.create({
        data: {
          evento: { connect: { id } },
          usuario: { connect: { id: nova.id } },
          observacao: nova.observacao
        }
      });
    }
  }

  
  const idsUsuariosNovos = novasParticipacoes.map(p => p.id);
  const idsParaRemover = participacoesAtuais
    .filter(p => !idsUsuariosNovos.includes(p.usuarioId))
    .map(p => p.id);

  if (idsParaRemover.length > 0) {
    await this.prisma.participacao.deleteMany({
      where: {
        id: { in: idsParaRemover }
      }
    });
  }

  return this.prisma.evento.update({
    where: { id },
    data: {
      nome: dados.nome,
      descricao: dados.descricao,
      data: dados.data ? new Date(dados.data) : undefined
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
