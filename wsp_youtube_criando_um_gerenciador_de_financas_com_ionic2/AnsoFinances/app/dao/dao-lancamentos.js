import {Storage, SqlStorage} from 'ionic-angular';

export class DAOLancamentos {
    constructor() {
        let storage = new Storage(SqlStorage);

        storage.query(
            "CREATE TABLE IF NOT EXISTS lancamentos ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "descricao TEXT, "+
                "valor REAL, "+
                "data INTEGER, "+
                "conta TEXT, "+
                "entradaSaida TEXT, "+
                "pago INTEGER)"
        ).then((data) => {
            console.log("Tabela criada");
        }, (error) => {
            console.log("Erro: "+ JSON.stringify(error.err));
        });
    }

    insert(lancamento, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query(
            "INSERT INTO lancamentos(descricao, valor, data, conta, entradaSaida, pago)" +
            "VALUES (?, ?, ?, ?, ?, ?)",[
                lancamento.descricao,
                lancamento.valor,
                lancamento.data,
                lancamento.conta,
                lancamento.entradaSaida,
                lancamento.pago
            ]
        ).then((data) => {
            successCallBack(lancamento)
            console.log("Inserido valores na tabela lancamentos");
        }, (error) => {
            console.log("Erro: "+ JSON.stringify(error.err));
        });
    }

    getList(dataInicio, dataFim, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query(
            "SELECT * FROM lancamentos "+
            "WHERE data >= ? and data <= ?",
            [dataInicio.getTime(), dataFim.getTime()]
        ).then((data) => {
            let lista = [];

            for (var i = 0; i < data.res.rows.length; i++) {
                let lancamentoDB = data.res.rows.item(i);

                let lancamento = {
                    id: lancamentoDB.id,
                    descricao: lancamentoDB.descricao,
                    valor: lancamentoDB.valor,
                    data: lancamentoDB.data,
                    conta: lancamentoDB.conta,
                    entradaSaida: lancamentoDB.entradaSaida,
                    pago: lancamentoDB.pago
                }

                lista.push(lancamento);
            }

            successCallBack(lista)
        });
    }

    delete(lancamento, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query("DELETE FROM lancamentos WHERE id = ?", [lancamento.id]).then((data) => {
            successCallBack(lancamento);
        });
    }

    edit(lancamento, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query(`
            UPDATE lancamentos
            SET descricao = ?,
                valor = ?,
                data = ?,
                conta = ?,
                entradaSaida = ?,
                pago = ?
            WHERE id = ?`, [
                    lancamento.descricao,
                    lancamento.valor,
                    lancamento.data,
                    lancamento.conta,
                    lancamento.entradaSaida,
                    lancamento.pago,
                    lancamento.id
                ]
        ).then((data) => {
            successCallBack(lancamento);
        });
    }

    getSaldo(successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query(`
            SELECT TOTAL(valor) AS saldo, entradaSaida FROM lancamentos
            WHERE pago = 1
            AND entradaSaida = 'entrada'
            UNION
            SELECT TOTAL(valor) AS saldo, entradaSaida FROM lancamentos
            WHERE pago = 1
            AND entradaSaida = 'saida'
        `, []).then((data) => {
            let saldo = 0;

            for(var i = 0; i < data.res.rows.length; i++) {
                let item = data.res.rows.item(i);

                if(item.entradaSaida == "entrada")
                    saldo += item.saldo;
                else
                    saldo -= item.saldo;
            }

            successCallBack(saldo);
        });
    }

    getListGroupByConta(dataInicio, dataFim, entradaSaida, successCallBack) {
        let storage = new Storage(SqlStorage);

        storage.query(`
            SELECT conta, TOTAL(valor) AS saldoConta FROM lancamentos
            WHERE data >= ?
            AND data <= ?
            AND entradaSaida = ?
            AND pago = 1
            GROUP BY conta
        `, [dataInicio.getTime(), dataFim.getTime(), entradaSaida]).then((data) => {
            let lista = [];

            for(var i = 0; i < data.res.rows.length; i++) {
                let item = data.res.rows.item(i);
                let conta = {
                    conta: item.conta,
                    saldo: item.saldoConta,
                    percentual: 0
                };
                lista.push(conta);
            }

            successCallBack(lista);
        });
    }
}
