import { Component } from '@angular/core';
import { NavController, Platform, Loading} from 'ionic-angular';
import {TabsPage} from '../../pages/tabs/tabs';
import {Facebook} from 'ionic-native';
import {UserInfo} from '../../domain/userInfo';
import {FacebookService} from '../../services/facebook-service'

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [FacebookService]
})
export class LoginPage {

  constructor(private facebookService: FacebookService, private nav: NavController, private platform: Platform) {

  }

  pularLogin(){

   

     this.nav.push(TabsPage);
  }

   login() {

  
     this.facebookService.login().then( (result) => {
      
       this.pularLogin();
     }).catch ((error) => {

       console.log("Erro facebook: "+ error);
       
     })
   }
}
