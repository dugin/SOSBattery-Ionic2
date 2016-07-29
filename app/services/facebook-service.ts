import { Page, Platform, Loading } from 'ionic-angular';
import { Injectable, Component } from '@angular/core';
import {Facebook} from 'ionic-native';
import {UserInfo} from '../domain/userInfo'

@Injectable()
export class FacebookService {

     

    constructor( private platform: Platform ) {
        this.platform = platform;
    }

    login() : Promise<UserInfo>{

      let p = new Promise((resolve, reject) => {
      this.platform.ready().then(() => {


         let  permissions = ["email", "public_profile"];

      Facebook.login(permissions).then((response) => {



           Facebook.api('/' + response.authResponse.userID + '?fields=id,first_name,last_name,age_range,picture,gender,email',permissions).then(
          (result) => {
            let obj = JSON.parse(JSON.stringify(result));

            let email = obj.email;
             let imgURL = obj.picture.data.url;
            let id = obj.id;
            let gender = obj.gender;
            let name = obj.first_name  + ' ' + obj.last_name;
            let ageRange: string ;

            if(obj.age_range.max != null)
                 ageRange   = obj.age_range.min +'-'+obj.age_range.max;
            
            else
            ageRange = obj.age_range.min + '+';

            let userInfo = new UserInfo(email, ageRange, id, imgURL, name, gender);
             console.log(userInfo);

             let firebaseRef = firebase.database().ref();

             firebaseRef.child("/usuarios/facebook:"+id).set(userInfo).then ((completed) =>{

                    console.log("Firebase");
                   
                 resolve(userInfo);


             }).catch( (error) => {
                reject(error);
                 console.log(JSON.stringify("Erro!!: "+error));
                


             })

                    
          }

   ).catch ((error) => {

          console.log(JSON.stringify("Erro!!: "+error));
          reject(error);
        }) 
        
      }).catch ((error) => {

          console.log(JSON.stringify("Erro!!: "+error));
          reject(error);
        }) 


    })

      })

     return p;
    }
   

  
}