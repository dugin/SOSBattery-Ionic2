import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ListPage} from '../list/list'
@Component({
  templateUrl: 'build/pages/menu/menu.html'
})
export class MenuPage {
  constructor(private navController: NavController) {
  }

   onPageDidLeave (){
   

     this.navController.remove(0,this.navController.length());
 
  }
}
