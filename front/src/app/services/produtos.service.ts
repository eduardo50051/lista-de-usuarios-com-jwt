import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { IProduto } from '../interfaces/IProdutos';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = 'http://localhost:3000';
  private axiosInstance: AxiosInstance;

  constructor() { 
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl
    })
  }


  async criarProduto(novoProduto: IProduto): Promise<IProduto>{
    try {
      const response = await this.axiosInstance.post('/produtos', novoProduto);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;      
    }
  }


  async listarProdutos(): Promise<IProduto[]>{
    const response = await this.axiosInstance.get('/produtos');
    return response.data;
  }

  async listarProdutosId(id: number): Promise<IProduto>{
    const response = await this.axiosInstance.get(`/produtos/${id}`);
    return response.data;
  }

  async atualizarProduto(id: number, produto: IProduto): Promise<void>{

    try {
      await axios.put(`${this.apiUrl}/produtos/${id}`, produto, {
        headers: {
           'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  async deletarProduto(id: number): Promise<void>{
    try {
      await this.axiosInstance.delete(`/produtos${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  





}
