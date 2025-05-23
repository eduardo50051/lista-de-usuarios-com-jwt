import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { EditarOuCriarUsuarioComponent } from './components/editar-ou-criar-usuario/editar-ou-criar-usuario.component';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import { PaginaGeralComponent } from './components/pagina-geral/pagina-geral.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EventoListarComponent } from './components/evento-listar/evento-listar.component';
import { EventoEditarCriarComponent } from './components/evento-editar-criar/evento-editar-criar.component';
import { ListarProdutosComponent } from './components/listar-produtos/listar-produtos.component';
import { EditarCriarProdutoComponent } from './components/editar-criar-produto/editar-criar-produto.component';
import { ProdutoValorPipe } from './pipes/produto-valor.pipe';
import { provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarUsuariosComponent,
    EditarOuCriarUsuarioComponent,
    CadastrarUsuarioComponent,
    PaginaGeralComponent,
    HomeComponent,
    EventoListarComponent,
    EventoEditarCriarComponent,
    ListarProdutosComponent,
    EditarCriarProdutoComponent,
    ProdutoValorPipe
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
    }),
    
  ],
  providers: [ provideNgxMask(), ],
  bootstrap: [AppComponent]
})
export class AppModule { }
