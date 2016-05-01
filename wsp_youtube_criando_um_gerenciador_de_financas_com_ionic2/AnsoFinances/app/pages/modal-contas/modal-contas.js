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
        // quando for feito o fechamento (onDismiss) do modal será chamado o método
        // onDismiss do método insert() da classe ContasPage, vide contas.js, lá
        // o método insere o objeto "data" (no caso contas.js) no Dao
        // possibilitando que a view contas, antes do seu fechamento (dismiss),
        // atualize a lista
        this.view.dismiss(this.conta);
    }
}
