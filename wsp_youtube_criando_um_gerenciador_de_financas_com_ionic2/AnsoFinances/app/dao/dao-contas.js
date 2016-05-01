export class DAOContas {
    constructor() {
        this.list = [];
    }

    getList() {
        this.list = [
            {descricao: "Alimentação"},
            {descricao: "Lazer"},
            {descricao: "Transporte"}
        ]
        return this.list;
    }

    insert(conta) {
        this.list.push(conta);
    }

    edit(conta) {

    }

    delete(conta) {
        // obtém a posição da conta
        let pos = this.list.indexOf(conta);
        this.list.splice(pos, 1);
    }
}
