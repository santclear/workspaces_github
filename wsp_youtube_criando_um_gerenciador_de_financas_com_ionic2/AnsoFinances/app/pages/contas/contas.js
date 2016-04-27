import {Page} from 'ionic-angular';

// Tem que ser assim @Page({}), não assim @Page ({}) (não pode haver espaço)
@Page({
    templateUrl: "build/pages/contas/contas.html"
})

export class ContasPage {
    constructor() {
        
    }
}