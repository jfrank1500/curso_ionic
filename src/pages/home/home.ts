
import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public feeds: Array<string>;
  private url: string = "https://www.reddit.com/new.json";
  private olderPosts: string = "https://www.reddit.com/new.json?after=";
  private newerPosts: string = "https://www.reddit.com/new.json?before=";
  public noFilter: Array<any>;
  public hasFilter: boolean = false;

  constructor(public navCtrl: NavController,
    public http: Http,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController) {
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
        this.consertarImagens();
        this.noFilter = this.feeds;
        this.hasFilter = false;
      });
  }

  consertarImagens() {
    this.feeds.forEach((e: any, i, a) => {
      if (!e.data.thumbnail || e.data.thumbnail.indexOf('b.thumbs.redditmedia.com') === -1) {
        e.data.thumbnail = 'http://www.redditstatic.com/icon.png';
      }
    });
  }

  itemSelected(feed: any): void {
    let browser = new InAppBrowser();
    browser.create(feed.data.url, '_system');
  }

  doInfinite(infiniteScroll) {

    let entradas: any = this.feeds;

    let paramsUrl = (this.feeds.length > 0) ? entradas[this.feeds.length - 1].data.name : "";

    this.http.get(this.olderPosts + paramsUrl).map(res => res.json())
      .subscribe(data => {
        this.feeds = this.feeds.concat(data.data.children);
        this.consertarImagens();
        infiniteScroll.complete();
        this.noFilter = this.feeds;
        this.hasFilter = false;
      });

  }

  doRefresh(refresher) {

    let entradas: any = this.feeds;
    let paramsUrl = entradas[0].data.name;

    this.http.get(this.newerPosts + paramsUrl).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data.children.concat(this.feeds);
        this.consertarImagens();
        refresher.complete();
        this.noFilter = this.feeds;
        this.hasFilter = false;
      });
  }

  showFilters(): void {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filtros:',
      buttons: [
        {
          text: 'Música',
          handler: () => {
            this.feeds = this.noFilter.filter((item) => item.data.subreddit.toLowerCase() === "music");
            this.hasFilter = true;
          }
        },
        {
          text: 'Filmes',
          handler: () => {
            this.feeds = this.noFilter.filter((item) => item.data.subreddit.toLowerCase() === "movies");
            this.hasFilter = true;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.feeds = this.noFilter;
            this.hasFilter = false;
          }
        }
      ]
    });

    actionSheet.present();

  }



}
