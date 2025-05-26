import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { IVenda } from '../interfaces/IVenda';
import { IProdutoVenda } from '../interfaces/IVenda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  
  
  private apiUrl = 'http://localhost:3000';
  private axiosInstance: AxiosInstance;

   constructor() { 
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl
    })
  }



  async listarVendas(): Promise<IVenda[]> {
    try {
      const response = await this.axiosInstance.get('/venda');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async listarVendasPorId(id: number): Promise<IVenda> {
    try {
      const response = await this.axiosInstance.get(`/venda/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async criarVenda(venda: IVenda): Promise<IVenda> {
    try {
      const response = await this.axiosInstance.post('/venda', venda);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async atualizarVenda(id: number, venda: IVenda): Promise<IVenda> {
    try {
      const response = await this.axiosInstance.put(`/venda/${id}`, venda);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarVenda(id: number): Promise<void> {
    try {
      await this.axiosInstance.delete(`/venda${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }





}
