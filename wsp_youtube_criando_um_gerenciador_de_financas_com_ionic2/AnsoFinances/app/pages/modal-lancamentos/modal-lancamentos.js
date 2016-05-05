import {Page, NavController, ViewController} from 'ionic-angular';
import {DAOContas} from '../../dao/dao-contas';

@Page({
    templateUrl: 'build/pages/modal-lancamentos/modal-lancamentos.html',
})
export class ModalLancamentosPage {
    static get parameters() {
        return [[NavController], [ViewController]];
    }

    constructor(nav, view) {
        this.nav = nav;
        this.view = view;
        this.lancamento = {};

        this.dao = new DAOContas();

        this.dao.getList((lista) => {
            this.contas = lista;
        });
    }

    cancel() {
        this.view.dismiss();
    }

    save() {
        this.view.dismiss(this.lancamento);
    }
}
