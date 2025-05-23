import { Injectable } from '@angular/core';
import { IEvento } from '../interfaces/IEvento';
import axios, { AxiosInstance } from 'axios';
import { IEventoDetalhado } from '../interfaces/IEventoDetalhes';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:3000/';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async criarEvento(evento: IEvento): Promise<IEvento> {
    const payload = {
      ...evento,
      participantes: evento.participantes?.map(p => ({
        id: p.id,
        observacao: p.observacao
      }))
    };
    const response = await this.axiosInstance.post<IEvento>('eventos', payload);
    return response.data;
  }

  async listarEventos(): Promise<IEvento[]> {
    const response = await this.axiosInstance.get<IEvento[]>('eventos');
    return response.data;
  }


  async listarEventosPorUsuario(id: number): Promise<IEvento[]>{
    
      const response = await this.axiosInstance.get<IEvento[]>(`eventos/usuario/${id}`);
    
    return response.data;
  }



  async listarEventoPorId(id: number): Promise<IEventoDetalhado> {
    const response = await this.axiosInstance.get<IEventoDetalhado>(`eventos/${id}`);
    return response.data;
  }

  async atualizarEvento(id: number, evento: IEvento): Promise<IEvento> {
    const payload = {
      ...evento,
      participantes: evento.participantes?.map(p => ({
        id: p.id,
        observacao: p.observacao
      }))
    };
    const response = await this.axiosInstance.patch<IEvento>(`eventos/${id}`, payload);
    return response.data;
  }

  async deletarEvento(id: number): Promise<void> {
    await this.axiosInstance.delete(`/eventos/${id}`);
  }
}
