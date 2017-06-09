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