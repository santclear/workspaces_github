import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ContasPage} from './pages/contas/contas';

// @App indica o que a classe é ou o que a classe faz
@App({
  // 1. adiciona variável index a raiz
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

// definição de classe
export class MyApp {
  // passa o parâmetro para o construtor
  static get parameters() {
    return [[Platform]];
  }

  // construtor de classe
  constructor(platform) {
    this.home = HomePage;
    this.contas = ContasPage;
    
    // 2. variável index recebe a página definida no "import {HomePage}"
    this.index = this.home;

    // método
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault(); // aplica o estilo default ao statu bar
    });
  }
  
  openPage(opcao) {
    this.index = opcao;
  };
}
