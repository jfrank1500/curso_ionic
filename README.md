# Mini-curso de Ionic & Angular
![Logo](./docs/ionic-logo.png)
## Preparação do ambiente
### Ferramentas
- [NodeJS](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Cordova e Ionic](https://ionicframework.com/docs/developer-resources/platform-setup/windows-setup.html)
    - sudo npm install -g ionic cordova

## Projeto

### Criação da estrutura inicial
```bash
$ ionic start curso blank --appname “Curso” --id “br.unp.sistemas.ionic”
...
? Link this app to your Ionic Dashboard to use tools like Ionic View? (Y/n) n
$ cd curso
$ ionic serve
```

### Compilando para Android
```bash
$ ionic cordova platform add android
$ ionic cordova run android
```
