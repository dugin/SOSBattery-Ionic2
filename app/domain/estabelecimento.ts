


/**
 * estabelecimento
 */
export class Estabelecimento {

    
        constructor(public nome: string, public tipo: string,public end: string,
        public bairro: string,
         public cidade: string, public estado: string, public imgURL: string,
         public coordenadas: [number], public createdAt: string, public modifiedAt: string,
          public cabo: Cabo, public wifi: boolean, public wifiSSID: string,
          public wifiSenha: string, 
          public id: string, public hr_open: [string],public hr_close: [string]) {
        }

        
        public set dist(distancia : string) {
            this.dist = distancia;
        }

        
        public get dist() : string {
            return this.dist;
        }
        
        
        
    
}

interface Cabo {

    iphone: boolean;
    android: boolean;
}