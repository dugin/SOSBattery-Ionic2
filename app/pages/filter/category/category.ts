import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the FilterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/filter/category/category.html',
 
})
export class CategoryModal implements OnInit {

  categoria: [any];
 selectedCategory = new Array<string>();

  constructor( private viewCtrl: ViewController) {

     this.retrieveCategoryList().then( (cat) =>{
       this.categoria = cat;
     })


  }

  close() {
    this.viewCtrl.dismiss({categorias:  this.selectedCategory});
  }

  ngOnInit() {
   
  }

  save(){
      for (var key in this.categoria) {
        if (this.categoria.hasOwnProperty(key)) {
          var element = this.categoria[key];
          if(element.selected)
          this.selectedCategory.push(element.nome)
          
        }
      }
      this.close();

  }

  retrieveCategoryList() : Promise<[any]>{

    let promise: Promise<[any]> = new Promise((resolve, reject) =>{

       let firebaseRef = firebase.database().ref().child('/categoria_empresa');
       firebaseRef.once('value',(snapshot) => {
         let tam = snapshot.numChildren();
         let array = [];
          let cont = 0;
          firebaseRef.on('child_added', (snapshot) => {

        array.push(snapshot.val());
        cont++;

        if(cont == tam)
        resolve(array);
      
});
        })

   

      });
      return promise;
  }

}
