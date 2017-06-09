# Mini-curso de Ionic & Angular
![Logo](./docs/ionic-logo.png)

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
### Passo 2 - Alterando o projeto

#### home.html
```xml
<ion-header>
  <ion-navbar>
    <ion-title>Leitor de feeds</ion-title>
  </ion-navbar>
</ion-header>
<ion-content></ion-content>
```

### home.ts
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

#### Compilando para Android
```bash
$ ionic cordova platform add android
$ ionic cordova run android
```
