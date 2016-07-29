import { Component, OnInit } from '@angular/core';
import { NavController, Modal, NavParams } from 'ionic-angular';
import {CategoryModal} from './category/category';
import {Filter} from '../../domain/filter';
import {ListService} from '../../services/listservice'
/*
  Generated class for the FilterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/filter/filter.html',
})
export class FilterPage implements OnInit {

  dist: number;

  categoryArray: string[]

  constructor(private nav: NavController, private params: NavParams) {

  }

  ngOnInit() {
  
    this.dist = 1;
  }



  presentCategoryModal() {
   let contactModal = Modal.create(CategoryModal);

   contactModal.onDismiss(data => {

      this.categoryArray = data;

});
   
   this.nav.present(contactModal);
 }

 filtrar(){

  ListService.filter =  new Filter(this.dist, this.categoryArray);
   this.nav.pop();

 }
 
 descartar(){
   
 }

}
