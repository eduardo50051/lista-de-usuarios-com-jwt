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
  ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
