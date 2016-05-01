import {Page, Modal, NavController} from 'ionic-angular';
import {DAOContas} from '../../dao/dao-contas';
import {ModalContasPage} from "../modal-contas/modal-contas"

// Tem que ser assim @Page({}), não assim @Page ({}) (não pode haver espaço)
@Page({
    templateUrl: "build/pages/contas/contas.html"
})

export class ContasPage {
    static get parameters() {
        return [[NavController]]
    }

    constructor(nav) {
        this.dao = new DAOContas();
        this.listContas = this.dao.getList();

        this.nav = nav;
    }

    insert() {
        let modal = Modal.create(ModalContasPage);

        // (data) => {} equivale a function(data) {}
        modal.onDismiss((data) => {
            this.dao.insert(data);
        });

        this.nav.present(modal);
    }

    edit(conta) {
        // {parametro: conta} passa parametro para outra tela pegar
        let modal = Modal.create(ModalContasPage, {parametro: conta});

        // (data) => {} equivale a function(data) {}
        modal.onDismiss((data) => {
            this.dao.edit(data);
        });

        this.nav.present(modal);
    }

    delete(conta) {
        this.dao.delete(conta);
    }
}
