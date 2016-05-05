import {Page} from 'ionic-angular';
import {LancamentosPage} from '../lancamentos/lancamentos';

// @Page definindo a função da classe, nesse caso o que ela é
// ou seja uma página
@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    constructor() {
        this.lancamentos = LancamentosPage;
    }
}
