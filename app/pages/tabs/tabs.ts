import {Component} from '@angular/core';
import {ListPage} from '../list/list';
import {MapPage} from '../map/map';
import {MenuPage} from '../menu/menu';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor(nav : NavController) {
    console.log("TabsPage");

     if(nav.length() > 1)
     nav.remove(1);
    
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ListPage;
    this.tab2Root = MapPage;
    this.tab3Root = MenuPage;
  }
}
