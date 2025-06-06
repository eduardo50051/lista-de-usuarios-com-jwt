import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventosModule } from './modules/eventos/eventos.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { VendaModule } from './modules/venda/venda.module';

@Module({
  imports: [
    UsuariosModule,
    AuthModule,
    EventosModule,
    ProdutosModule,
    VendaModule
  ],
})
export class AppModule {}
