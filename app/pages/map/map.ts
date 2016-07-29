import {Component, OnInit } from '@angular/core';
import {NavController, Platform, Loading} from 'ionic-angular';
import {GoogleMap, GoogleMapsMarker, GoogleMapsEvent ,GoogleMapsLatLng, GoogleMapsMarkerOptions} from 'ionic-native';
import {ListService} from '../../services/listservice'
import {Estabelecimento} from '../../domain/estabelecimento'
import {ListPage} from '../list/list'

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage implements OnInit{
  private map: GoogleMap;
  static j =0;
 
 
  constructor(private navController: NavController, private platform: Platform) {
    
  }

   onPageDidLeave (){

      this.navController.remove(0,this.navController.length());
  }

 

ngOnInit(){


    GoogleMap.isAvailable().then(() => {

       this.map = new GoogleMap('map_canvas', {disableDefaultUI: true
          });
       
      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
       
      this.map.setMyLocationEnabled(true);
       
        let myPosition = new GoogleMapsLatLng( ListService.myPosition.coords.latitude,
          ListService.myPosition.coords.longitude);

      

        this.map.moveCamera({ target: myPosition, zoom: 16 });

  
        MapPage.addMarker(ListService.lojasAbertas, true, this.map);

         MapPage.addMarker(ListService.lojasFechadas, false, this.map);
        


         });


    });


  }

  static addMarker(list: Estabelecimento[], isOpen: boolean, map: GoogleMap){

     let icon  = {url: "./images/bateria_mapa.png"};

     for (let i in list) {
            if (list.hasOwnProperty(i)) {
              let est = list[i];
              let pos = new GoogleMapsLatLng(est.coordenadas[0], est.coordenadas[1]);

             map.addMarker(new GoogleMapsMarker({})).then( (marker)=>{

              marker.setPosition(new GoogleMapsLatLng(list[MapPage.j].coordenadas[0], ListService.lojasAbertas[MapPage.j].coordenadas[1]));
              marker.setIcon(icon);
              marker.setTitle(list[MapPage.j].nome);
              
              marker.setSnippet(ListService.showHrFunc(list[MapPage.j].hr_open, list[MapPage.j].hr_close));
              if(!isOpen)
              marker.setOpacity(.5);
           

              MapPage.j++;
                      if(MapPage.j == list.length)
                      MapPage.j = 0;  

      });
  
    
              
            }
          }


  }

}