import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';
import {LoginPage} from './pages/login/login'
import {Facebook} from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  

})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    const
            fbConf = {
             apiKey: "AIzaSyDzxMGVm1Z4vuAhN3Cu5v7gZix7Ty7OQFw",
             authDomain: "sos-battery-test.firebaseapp.com",
            databaseURL: "https://sos-battery-test.firebaseio.com",
             storageBucket: "sos-battery-test.appspot.com",
        };

    platform.ready().then(() => {
      firebase.initializeApp(fbConf);
         this.rootPage = TabsPage;
        this.hideSplashScreen();
       

       
        Facebook.getLoginStatus().then((loginStatus) =>{

                 

          if(loginStatus.status.localeCompare("unknown") == 0){
           this.rootPage = LoginPage;
         
           
          }
           else{
           this.rootPage = TabsPage;
           }

         

        }).catch ((error) =>{
          console.log(error);
          
        })
   
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  hideSplashScreen() {
    
     if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
      }, 1000);
      }   
      }
}


ionicBootstrap(MyApp);
