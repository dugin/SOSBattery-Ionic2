import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {NavController, Platform, Loading} from 'ionic-angular';
import {ListService} from '../../services/listservice'
import {Estabelecimento} from '../../domain/estabelecimento'
import {DetailsPage} from '../details/details'
import {FilterPage} from '../filter/filter'
import {Filter} from '../../domain/filter'
@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [ListService]
})
export class ListPage  implements OnInit {

  estabelecimentosAbertos: Array<Estabelecimento>;
    estabelecimentosFechados: Array<Estabelecimento>;
  haveStoreClosed: boolean;
  noStoresNearby: boolean;
  
  
  constructor(public listaService: ListService,  private navController: NavController) {
  
  }

  
  ngOnInit() {
    console.log("ngOnInit");
    
 this.setQuery(new Filter(5));

  }


  setQuery(filter: Filter){


    let loading = Loading.create({
    content: 'Carregando Estabelecimentos...'
});

this.navController.present(loading);

    this.listaService.getListOfStores(filter).then(loja => {
    
     
     this.estabelecimentosAbertos = loja[0];
      this.estabelecimentosFechados = loja[1];

      if(loja[1].length > 0)
      this.haveStoreClosed = true;



      if(loja[0].length == 0 && loja[1].length == 0){
        console.log("Aqui!!!");
        
        document.getElementsByTagName("ion-tabbar")[0].setAttribute('hidden', '');
        this.noStoresNearby = true;
       
      }else
       document.getElementsByTagName("ion-tabbar")[0].removeAttribute('hidden');
    loading.dismiss()}); 


  }

  selectStore(est: Estabelecimento){

    this.navController.push(DetailsPage, {estabelecimento: est});

  }


 showHrFunc(hrOpen: [string], hrClose: [string]) : string {

  return ListService.showHrFunc(hrOpen, hrClose);
}

filterSelected(){

  this.navController.push(FilterPage);

}

ionViewWillEnter(){

    if(ListService.filter.categorias != null){
      this.resetVariables();
       this.setQuery(ListService.filter);
     // console.log(ListService.filter);
      
    }

}

resetVariables(){
 this.estabelecimentosAbertos.splice(0,this.estabelecimentosAbertos.length );
    this.estabelecimentosFechados.splice(0,this.estabelecimentosFechados.length );
   this.haveStoreClosed = false;
   this.noStoresNearby = false;
}
  


}
