import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { PaginaGeralComponent } from './components/pagina-geral/pagina-geral.component';
import { HomeComponent } from './components/home/home.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { EditarOuCriarUsuarioComponent } from './components/editar-ou-criar-usuario/editar-ou-criar-usuario.component';
import { EventoListarComponent } from './components/evento-listar/evento-listar.component';
import { EventoEditarCriarComponent } from './components/evento-editar-criar/evento-editar-criar.component';
import { ListarProdutosComponent } from './components/listar-produtos/listar-produtos.component';
import { EditarCriarProdutoComponent } from './components/editar-criar-produto/editar-criar-produto.component';
import { CriarVendaComponent } from './components/criar-venda/criar-venda.component';
import { ListarVendaComponent } from './components/listar-venda/listar-venda.component';

const routes: Routes = [

{path: '', redirectTo: 'home', pathMatch: 'full'},
{
  path: 'login',
  component: LoginComponent
},
{
  path: '',
  canActivate: [AuthGuard],
  component: PaginaGeralComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'listar-usuarios',
      component: ListarUsuariosComponent
    },
    {
      path: 'editar-usuario/:id',
      component: EditarOuCriarUsuarioComponent
    },
    {
      path: 'listar-eventos',
      component: EventoListarComponent
    },
     {
      path: 'editar-evento/:id',
      component: EventoEditarCriarComponent
    },
     {
      path: 'listar-produtos',
      component: ListarProdutosComponent
    },
      {
      path: 'editar-produto/:id',
      component: EditarCriarProdutoComponent
    },
       {
      path: 'editar-venda/:id',
      component: CriarVendaComponent
    },
       {
      path: 'listar-venda',
      component: ListarVendaComponent
    },
  ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
