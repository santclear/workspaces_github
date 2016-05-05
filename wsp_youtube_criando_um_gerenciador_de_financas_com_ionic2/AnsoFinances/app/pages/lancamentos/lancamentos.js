import {Page, Modal, NavController} from 'ionic-angular';
import {DAOLancamentos} from '../../dao/dao-lancamentos';
import {ModalLancamentosPage} from '../modal-lancamentos/modal-lancamentos';

@Page({
    templateUrl: 'build/pages/lancamentos/lancamentos.html',
})
export class LancamentosPage {
    static get parameters() {
        return [[NavController]];
    }

    constructor(nav) {
        this.nav = nav;
        this.dao = new DAOLancamentos();
        this.listLancamentos = [];

        this.dao.getList((lista) => {
            this.listLancamentos = lista;
        });
    }

    insert() {
        let modal = Modal.create(ModalLancamentosPage);

        modal.onDismiss((data) => {
            if(data) {
                this.dao.insert(data, (lancamento) => {
                    this.listLancamentos.push(lancamento);
                })
            }
        });

        this.nav.present(modal);
    }
}
