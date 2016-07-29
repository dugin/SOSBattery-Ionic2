import { Injectable } from '@angular/core';
import {Estabelecimento} from '../domain/estabelecimento'
import {Filter} from '../domain/filter'
declare var GeoFire: any;


@Injectable()
export class ListService {

static filter: Filter;
static myPosition: Position;
private static  lojasNoRaio = new Array<number>();
static lojasAbertas: Array<Estabelecimento> = new Array<Estabelecimento>();
static lojasFechadas: Array<Estabelecimento> = new Array<Estabelecimento>();
    constructor() {
        
    }

  getListOfStores( filter : Filter) : Promise<Array<Array<Estabelecimento>>>{

console.log("Distancia: "+filter.dist);

 let promise: Promise<Array<Array<Estabelecimento>>> = new Promise((resolve, reject) =>{

   let estArray = new Array<Array<Estabelecimento>>();

   estArray.push(ListService.lojasAbertas);
   estArray.push(ListService.lojasFechadas);

let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 navigator.geolocation.getCurrentPosition(
 
            (position) => {
          console.log(position);
          
    ListService.myPosition = position;  
  let firebaseRef = firebase.database().ref();

    let geoFire = new GeoFire(firebaseRef.child('/coordenadas'));

    let geoQuery = geoFire.query({
  center: [position.coords.latitude, position.coords.longitude],
  radius: filter.dist
});
 
  geoQuery.on("key_entered", function(key, location, distance) {
 
   ListService.lojasNoRaio[key] = distance 
});

 geoQuery.on("ready", function() {
 // Ordena por lojas mais proxima
        let lojasOrdenadas = [];
        
     
      
        
        if( Object.keys(ListService.lojasNoRaio).length == 0)
                resolve(estArray);

        for (let x in ListService.lojasNoRaio)       
                lojasOrdenadas.push([x, ListService.lojasNoRaio[x]]);      

   lojasOrdenadas.sort(function (a, b) { return a[1] - b[1] })
        let cont: number = 0;

           for (let y in lojasOrdenadas) {

             //  ListService.dist.push(ListService.calcDist(lojasOrdenadas[y][1]))

            firebaseRef.child("estabelecimentos/"+lojasOrdenadas[y][0]).on("value", function (snapshot) {

                let loja: Estabelecimento = snapshot.val();

                  if(loja.cabo.android){

                     loja.dist =ListService.calcDist(lojasOrdenadas[y][1]);
                      

                   if(ListService.isStoreOpen(loja))
                    ListService.lojasAbertas.push(loja);

                    else
                       ListService.lojasFechadas.push(loja);

                  }
                  cont++;

                  if(cont == lojasOrdenadas.length)
                  resolve(estArray);
               
});

}


});

         
            },
 
            (error) => {
                console.log(error);
            }, locationOptions
 
        );

 })


        return promise ;
        
      

  }


static isStoreOpen(est : Estabelecimento){

let date = new Date();
    let day: number = date.getDay();

    

if (est.hr_open[day].localeCompare("00:00") == 0 && est.hr_close[day].localeCompare("00:00") == 0) 
return false;

else {

  let hrAtual =  date.getHours();

            let hrAbre = Number.parseInt(est.hr_open[day].slice(0,2));
            let hrFecha = Number.parseInt(est.hr_close[day].slice(0,2));

            if (hrAtual < 6)
                hrAtual += 24;


            if (hrFecha < 9)
                hrFecha += 24;


            if (hrAtual < hrAbre || hrAtual >= hrFecha) {
                      return false;
               
            } else {

               return true;
            }


}

}


 static showHrFunc(hrOpen: [string], hrClose: [string]) : string {

   let date = new Date();
    let day: number = date.getDay();

if (hrOpen[day].localeCompare("00:00") == 0 && hrClose[day].localeCompare("00:00") == 0) 
return "Não Abre";

  return hrOpen[day] + " às " + hrClose[day];

}

static calcDist( distanciaM: number) : string  {

       let  segundos: number = distanciaM * 1000/ 1.3;
       let minutos: number = segundos / 60;
    if ( minutos == 0)
    minutos = 1;

    
    return  Math.round(minutos) + " min" ;

     }
}