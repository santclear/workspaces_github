import {Page, ViewController, NavParams} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/modal-contas/modal-contas.html',
})
export class ModalContasPage {
    static get parameters() {
        return [[ViewController], [NavParams]]
    }

    constructor(view, params) {
        this.view = view;

        // params.get("parametro"), obtem parâmetro de outra tela
        this.conta = params.get("parametro") || {descricao: ""};
    }

    // fecha modal (parecido com popup) da tela contas
    cancel() {
        this.view.dismiss();
    }

    salvar() {
        this.view.dismiss(this.conta);
    }
}
