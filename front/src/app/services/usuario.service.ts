import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { ILogin } from '../interfaces/Ilogin';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: this.pegarToken()
      }
    });
  }

  async Entrar(data: ILogin): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/login`, data);

      const token = response.data.access_token;
      if (token) {
        localStorage.setItem('token', token);
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

     const dadosUsuario = response.data.usuario;

if (dadosUsuario) {
  localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
}



    } catch (error:any) {
      if (error.response) {
       
        
        const mensagemErro = error.response.data.message;
       
        
       
        throw new Error(mensagemErro); 
      } 
    }
  }

 
  private pegarToken(): string {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  }

 
  async criarUsuario(novoUsuario: IUsuario): Promise<IUsuario> {
    try {
      const response = await this.axiosInstance.post('/usuarios', novoUsuario);
      return response.data; 
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async listarTodos(): Promise<IUsuario[]> {
    const response = await this.axiosInstance.get('/usuarios');
    return response.data;
  }

  async listarPorId(id: number): Promise<IUsuario> {
    const response = await this.axiosInstance.get(`/usuarios/${id}`);
    return response.data;
  }
  
 async deletarUsuario(id: number): Promise<void> {
  try {
    await this.axiosInstance.delete(`/usuarios/${id}`);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error('Erro ao deletar usuário:', error.response.data.message);
      throw new Error(error.response.data.message); 
    } else {
      console.error('Erro desconhecido ao deletar usuário:', error);
      throw new Error('Erro ao deletar usuário. Tente novamente mais tarde.');
    }
  }
}



 usuarioTipo(): string | null {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario).tipo : null;
}

 usuarioNome(): string | null {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario).nome : null;
}

 usuarioId(): number | null {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario).id : null;
}

  async atualizarUsuario(id: number, usuario: IUsuario): Promise<void> {
    try {
      await axios.put(`${this.apiUrl}/usuarios/${id}`, usuario, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }





  
  Sair(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

 
  estaLogado(): boolean {
    return !!localStorage.getItem('token');
  }



}
