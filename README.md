# Mini-curso de Ionic & Angular
![Logo](./docs/ionic-logo.png)

* [Baseado no tutorial encontrado no site http://tableless.com](https://tableless.com.br/criando-uma-aplicacao-movel-com-ionic-2-e-angular-2-em-dez-passos/)

## Preparação do ambiente
### Passo 0 - Ferramentas
- [NodeJS](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Cordova e Ionic](https://ionicframework.com/docs/developer-resources/platform-setup/windows-setup.html)
    - sudo npm install -g ionic cordova

## Projeto
### Passo 1 - Criando o projeto

#### Usando o Ionic
```bash
$ ionic start curso blank --appname “Curso” --id “br.unp.sistemas.ionic”
...
? Link this app to your Ionic Dashboard to use tools like Ionic View? (Y/n) n
$ cd curso
$ ionic serve
```

#### Explorando a pasta de páginas
```bash
src/pages/home
  home.html - template visual
  home.scss - estilo SASS
  home.ts - controlador Typescript
```

#### src/pages/home/home/home.html
```xml
<ion-header>
  <ion-navbar>
    <ion-title>Leitor de feeds</ion-title>
  </ion-navbar>
</ion-header>
<ion-content></ion-content>
```

#### src/pages/home/home.ts
```typescript
/* Declaração de componentes externos */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/* Decorador do componente page-home */
@Component({
   selector: 'page-home',
   templateUrl: 'home.html'
})
/* Definição da classe do componente */
export class HomePage {
   constructor(public navCtrl: NavController) {}
}
```

### Passo 2 - Consumindo uma API pública

#### src/app/app.module.ts

É necessário adicionar o módulo HTTP para fazer o consumo da API.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
/* -------------- MODULO HTTP --------------*/
import { HttpModule } from '@angular/http'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    /* -------------- MODULO HTTP --------------*/
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

```

#### src/pages/home/home.ts
Injetamos o componente HTTP no construtor da classe HomePage.
Estamos fazendo uma requisição do tipo GET para a url do endpoint.
Usando rxjs para criar um Observable.

```typescript
/* Declaração de componentes externos */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
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

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data.children;
        console.log(this.feeds);
      });
  }
}
```

#### Exibindo o resultado para o usuário
Fazendo o loop com *ngFor. A variável **feeds** foi inicializada pelo controlador no construtor.
A sintaxe **{{feed.data.title}}** é chamada de interpolação.

```xml
<ion-header>
  <ion-navbar>
    <ion-title>Leitor de Feeds</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list>
    <ion-item *ngFor="let feed of feeds">
      {{feed.data.title}}
    </ion-item>
  </ion-list>
</ion-content>
```

### Passo 3 - Personalizando o template
#### src/pages/home/home.html
Além da interpolação, é possível fazer *binding* (vinculação) a atributos das tags como visto em **img[src]="feed.data.thumbnail"**. A sintaxe poderia ter sido substituída por **img src="{{ feed.data.thumbnail }}"**.

```xml
<ion-header>
  <ion-navbar>
    <ion-title>Leitor de Feeds</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list>
    <ion-item *ngFor="let feed of feeds">
      <ion-thumbnail item-left>
        <img [src]="feed.data.thumbnail">
      </ion-thumbnail>
      <h2>{{feed.data.title}}</h2>
      <p>{{feed.data.domain}}</p>
    </ion-item>
  </ion-list>
</ion-content>
```

### Passo 4 - Adicionando efeito de carregamento e eventos 
#### Efeito de carregamento - src/pages/home/home.ts
* Primeiro nós importamos o componente LoadingController da biblioteca ionic-angular e injetamos o objeto no método construtor.
* 
```typescript
/* Declaração de componentes externos */
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
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
    alert(feed.data.url);
  } 
}
```
### Passo 5 - Exibindo o conteúdo do link no browser 
#### Adicionando suporte para executar no Android
```bash
$ ionic cordova platform add android
$ ionic cordova run android
```
#### Adicionando suporte para executar no Browser
```bash
$ ionic cordova platform add browser
$ ionic cordova run browser
```
#### Adicionando o plugin inappbrowser
```bash
$ cordova plugin add cordova-plugin-inappbrowser
$ npm install --save @ionic-native/in-app-browser
```
#### Usando o plugin inappbrowser em src/pages/home/home.ts
```typescript
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
```