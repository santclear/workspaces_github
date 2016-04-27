import {Page} from 'ionic-angular';

// @Page definindo a função da classe, nesse caso o que ela é
// ou seja uma página
@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor() {
    this.nome = "AnsoDev"
  }
  
  geNome() {
    return "Retornado pelo método: "+ this.nome;
  }
}
