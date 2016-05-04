import {Page, Modal, NavController, Alert} from 'ionic-angular';
import {DAOContas} from '../../dao/dao-contas';
import {ModalContasPage} from "../modal-contas/modal-contas"
import {Toast} from "ionic-native";

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
        this.dao.getList((lista) => {
            this.listContas = lista;
        });
        // 1. cria uma propriedade chamada nav, a qual recebe o nav por parâmetro,
        // obs.: quem setou o nav do parâmetro foi o "return [[NavController]]"
        this.nav = nav;
    }

    insert() {
        let modal = Modal.create(ModalContasPage);

        // (data) => {} equivale a function(data) {}
        modal.onDismiss((data) => {
            if(data) {
                this.dao.insert(data, (conta) => {
                    this.listContas.push(conta);

                    Toast.showShortBottom("Conta inserida com sucesso.").subscribe((toast) => {
                        console.log(toast);
                    });
                });
            }
        });

        // abre o modal
        this.nav.present(modal);
    }

    edit(conta) {
        // {parametro: conta} passa parametro para outra tela pegar
        let modal = Modal.create(ModalContasPage, {parametro: conta});

        // (data) => {} equivale a function(data) {}
        modal.onDismiss((data) => {
            if(data) {
                this.dao.edit(data, (conta) => {
                    Toast.showShortBottom("Conta alterada com sucesso.").subscribe((toast) => {
                        console.log(toast);
                    });
                });
            }
        });

        this.nav.present(modal);
    }

    delete(conta) {
        let confirm = Alert.create({
            title: "Excluir",
            body: "Gostaria de realmente excluir a conta "+ conta.descricao +"?",
            buttons: [
                {
                    text: "Sim",
                    handler: () => {
                        this.dao.delete(conta, (conta) => {
                            // obtém a posição da conta
                            let pos = this.listContas.indexOf(conta);
                            this.listContas.splice(pos, 1);
                            Toast.showShortBottom("Conta excluida com sucesso.").subscribe((toast) => {
                                console.log(toast);
                            });
                        });
                    }
                },
                {text: "Não"}
            ]
        });

        this.nav.present(confirm);
    }
}
