import { Imprimivel } from './imprimivel';
import { MeuObjeto } from '../helpers/index';

export class Negociacao implements Imprimivel, MeuObjeto<Negociacao>{

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {

    }


    get volume() {
        return this.valor * this.quantidade;

    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }


    ehIgual(negociacao: Negociacao): boolean {

        return this.data.getDate() == negociacao.data.getDate()
        && this.data.getMonth() == negociacao.data.getMonth()
        && this.data.getFullYear() == negociacao.data.getFullYear();
    }

}