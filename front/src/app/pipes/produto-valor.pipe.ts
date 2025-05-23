import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'produtoValor'
})
export class ProdutoValorPipe implements PipeTransform {

  transform(valor: number | string): string {

    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;

    if(isNaN(numero)){
      return 'valor invalido';
    }

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

}
