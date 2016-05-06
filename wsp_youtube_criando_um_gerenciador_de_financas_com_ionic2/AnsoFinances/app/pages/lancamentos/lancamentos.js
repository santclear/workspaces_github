import {Page, Modal, NavController, Alert} from 'ionic-angular';
import {DAOLancamentos} from '../../dao/dao-lancamentos';
import {ModalLancamentosPage} from '../modal-lancamentos/modal-lancamentos';
import {DataUtil} from '../../util/data-util';

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

    delete(lancamento) {
        let confirm = Alert.create({
            title: "Excluir",
            body: "Gostaria de realemente excluir o lançamento "+ lancamento.descricao + "?",
            buttons: [
                {
                    text: "Sim",
                    handler: () => {
                        this.dao.delete(lancamento, (lancamento) => {
                            let pos = this.listLancamentos.indexOf(lancamento);
                            this.listLancamentos.splice(pos, 1);
                        });
                    }
                },
                {text: "Não"}
            ]
        });

        this.nav.present(confirm);
    }

    edit(lancamento) {
        let modal = Modal.create(ModalLancamentosPage, {parametro: lancamento});

        modal.onDismiss((data) => {
            if(data) {
                this.dao.edit(lancamento, (lancamento) => {
                    Toast.showShortBottom("Conta alterada com sucesso.").subscribe((toast) => {
                        console.log(toast);
                    });
                });
            }
        });

        this.nav.present(modal);
    }

    getDate(lancamento) {
        let dataUtil = new DataUtil;
        return dataUtil.parseString(lancamento.data);
    }

    situacaoLancamento(lancamento) {
        return lancamento.pago ? "Pago" : "Não pago";
    }

    lancamentoEntrada(lancamento) {
        return lancamento.entradaSaida == "entrada";
    }
}
