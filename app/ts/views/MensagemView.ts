import {View} from '../views/View';
export class MensagemView extends View<String> {


    update(model:string): void {

        this._elemento.html(this.template(model));

    }

    template(model: string): string {

        return `<p class="alert alert-info">${model}</p>`;
    }
}