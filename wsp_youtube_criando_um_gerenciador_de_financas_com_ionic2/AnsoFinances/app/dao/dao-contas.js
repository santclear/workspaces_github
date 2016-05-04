import {Storage, SqlStorage} from 'ionic-angular'; // importa plugin de banco de dados sqlite

export class DAOContas {
    constructor() {
        let storage = new Storage(SqlStorage);

        // query(): método usado para fazer CRUD
        storage.query("CREATE TABLE IF NOT EXISTS contas(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)").then((data) => {
            console.log("Tabela criada");
        }, (error) => {
            console.log("Erro na criação da tabela "+ JSON.stringfy(error.err));
        });
    }

    getList(successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query("SELECT * FROM contas").then((data) => {
            let lista = [];

            for(var i = 0; i < data.res.rows.length; i++) {
                let item = {};

                item.id = data.res.rows.item(i).id;
                item.descricao = data.res.rows.item(i).descricao;

                lista.push(item);
            }

            successCallBack(lista);
        }, (error) => {
            console.log("Erro na criação da tabela "+ JSON.stringfy(error.err));
        })
    }

    insert(conta, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query("INSERT INTO contas(descricao) VALUES(?)", [conta.descricao]).then((data) => {
            conta.id = data.res.insertId;
            successCallBack(conta);
            console.log("Gravou");
        }, (error) => {
            console.log("Erro na criação da tabela "+ JSON.stringfy(error.err));
        });
    }

    edit(conta, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query("UPDATE contas SET descricao = ? WHERE id = ?", [conta.descricao, conta.id]).then((data) => {
        successCallBack(conta);
        }, (error) => {
            console.log("Erro na criação da tabela "+ JSON.stringfy(error.err));
        });
    }

    delete(conta, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query("DELETE FROM contas WHERE id = ?", [conta.id]).then((data) => {
            successCallBack(conta);
            console.log("Deletou");
        }, (error) => {
            console.log("Erro na criação da tabela "+ JSON.stringfy(error.err));
        });
    }
}
