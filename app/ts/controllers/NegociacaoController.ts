import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { imprime } from '../helpers/index';
import { domInject, throttle, logarTempoDeExecucao } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';


let timer = 0;

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacaoView");
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {

        this._negociacoesView.update(this._negociacoes);

    }

    @throttle()
    async importarDados() {


        try {

            const negociacoesParaImportar = await this._service
                .obterNegociacoes(res => {

                    if (res.ok) {

                        return res;
                    }
                    else {
                        throw new Error(res.statusText);
                    }

                })

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch (error) {
            this._mensagemView.update(error);
        }

    }


    adiciona(event: Event) {

        event.preventDefault();
        let data = this._inputData.val().replace(/-/g, ',');

        if (!this._ehDiaUtil(new Date(data))) {

            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return

        }


        const negociacao = new Negociacao(
            new Date(data),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())

        );

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');



        console.log(negociacao);

    }


    private _ehDiaUtil(data: Date): Boolean {
        let diaUtil = false;
        if (data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo)
            diaUtil = true;


        return diaUtil;

    }

}


enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado,
}