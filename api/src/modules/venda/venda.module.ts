import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VendaService, PrismaService],
  controllers: [VendaController]
})
export class VendaModule {}
