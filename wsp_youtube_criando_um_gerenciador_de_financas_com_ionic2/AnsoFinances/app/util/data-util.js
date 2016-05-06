export class DataUtil {
    parseData(data) {
        var parts = data.split("-");
        return new Date(parts[0], parts[1]-1, parts[2]);
    }

    parseString(data) {
        return new Date(data).toLocaleDateString();
    }

    formatDate(dataMilliseconds) {
        let data = new Date(dataMilliseconds);
        let inicio = "00";

        let ano = data.getFullYear();
        let mes = (inicio + (data.getMonth() + 1)).slice(-inicio.length);
        let dia = (inicio + data.getDate()).slice(-inicio.length);

        return ano +"-"+ mes +"-"+ dia;
    }
}
