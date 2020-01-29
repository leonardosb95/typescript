import { Negociacao } from './Negociacao'
import {Imprimivel} from './imprimivel'
import { logarTempoDeExecucao } from '../helpers/decorators/index';
import { imprime, MeuObjeto } from '../helpers/index';

export class Negociacoes implements Imprimivel,MeuObjeto<Negociacoes> {

    private _negociacoes: Array<Negociacao> = [];


    @logarTempoDeExecucao(true)
    adiciona(negociacao: Negociacao) {

        this._negociacoes.push(negociacao);


    }

    @logarTempoDeExecucao(true)
    paraArray():Negociacao[]{

        return ([] as Negociacao []).concat(this._negociacoes); //Devolvemos um novo objeto, programação defensiva
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }


    ehIgual(negociacoes:Negociacoes):boolean{

        return JSON.stringify(this._negociacoes)==JSON.stringify(negociacoes);

    }

   

}