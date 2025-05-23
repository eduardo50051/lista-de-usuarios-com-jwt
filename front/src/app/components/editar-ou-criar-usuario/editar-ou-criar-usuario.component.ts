import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-ou-criar-usuario',
  templateUrl: './editar-ou-criar-usuario.component.html',
  styleUrls: ['./editar-ou-criar-usuario.component.scss']
})
export class EditarOuCriarUsuarioComponent implements OnInit{



  usuario: IUsuario | null = null;

  novaSenha: string = '';
  confirmarSenha: string = '';
  

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const usuarioId = this.route.snapshot.paramMap.get('id'); 
    if (usuarioId) {
      this.listarUsuarioId(Number(usuarioId));
    }
  }

  
  async listarUsuarioId(id: number): Promise<void> {
    try {
      this.usuario = await this.usuarioService.listarPorId(id);
    } catch (error) {
      console.log(error);
    }
  }

  
  async deletarUsuario(): Promise<void> {
   
    const usuarioId = this.route.snapshot.paramMap.get('id');
    if (!usuarioId) {
      
      return;
    }

   
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        
        await this.usuarioService.deletarUsuario(Number(usuarioId));
      

        
        this.toastr.success('usuario deletado com sucesso');

        
        this.router.navigate(['/listar-usuarios']);
      } catch (error: any) {
  console.error('Erro ao excluir:', error);

  const mensagemErro = error.message || 'Erro ao excluir o usuário.';

  
  // this.toastr.error(mensagemErro, 'Erro');

   
   Swal.fire('Erro', mensagemErro, 'error');
}
    }
  }




async atualizarUsuario(): Promise<void> {
  const usuarioId = this.route.snapshot.paramMap.get('id'); 
  if (!usuarioId || !this.usuario) return;

  const dadosAtualizados: any = {
    nome: this.usuario.nome,
    email: this.usuario.email,
    tipoUsuarioId: this.usuario.tipoUsuarioId,
   
  };

  if (this.novaSenha) {
    dadosAtualizados.senha = this.novaSenha;
  }

  try {
    await this.usuarioService.atualizarUsuario(Number(usuarioId), dadosAtualizados);
    this.toastr.success('Usuário atualizado com sucesso');
    this.router.navigate(['/listar-usuarios']);
  } catch (error) {
    console.error(error);
    this.toastr.error('Erro ao atualizar o usuário');
  }
}

  




}
