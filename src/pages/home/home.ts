/* Declaração de componentes externos */
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';

/* Decorador do componente page-home */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
/* Definição da classe do componente */
export class HomePage {
  public feeds: Array<string>;
  private url: string = "https://www.reddit.com/new.json";

  constructor(public navCtrl: NavController,
    public http: Http,
    public loadingCtrl: LoadingController) {
    this.fetchContent();
  }
  fetchContent(): void {
    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });
    loading.present();
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data.children;
        loading.dismiss();
        console.log(this.feeds);
      });
  }
  itemSelected (feed):void {
    let browser = new InAppBrowser();
    browser.create(feed.data.url, '_system');
  } 
}