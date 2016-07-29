import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Estabelecimento} from '../../domain/estabelecimento'
import {ListService} from '../../services/listservice'
/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [ListService]
})
export class DetailsPage {

    est: Estabelecimento;
    
  constructor(private nav: NavController, private params: NavParams, private listService : ListService) {

   this.est = this.params.get('estabelecimento');
  }

  calcDist(){

  // ListService.
  }

}
