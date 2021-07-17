/* requerir módulo autos */
let autos = require('./autos.js')
const concesionaria = {
    autos: autos, 
    buscarAuto:  function(patente){
        for(let i = 0 ; i<autos.length; i++){
            if (autos[i].patente === patente){
                return autos[i]
            }
            if ( i == autos.length - 1)
                return null
        }
       }, 
    venderAuto: function(patente){
        this.buscarAuto(patente).vendido = true;
    },
    autosParaLaVenta: function(){
        return autos.filter(auto => auto.vendido == false);
    },
    autosNuevos: function(n){
       return this.autosParaLaVenta().filter(auto => auto.km < 100 );
    },
    listaDeVentas: function(){
    return autos.filter(auto => auto.vendido == true).map(auto => auto.precio);
    },
    totalDeVentas: function(){
        try{return this.listaDeVentas().reduce((est=0,acum)=> acum += est ) ;
        }catch(TypeError){
            return 0;
        }
        
    },
    puedeComprar:function(auto,persona){
        if(auto.precio <= persona.capacidadDePagoTotal && persona.capacidadDePagoEnCuotas * auto.cuotas >= auto.precio){
            return true;
        }else return false

    },
    autosQuePuedeComprar: function(persona){
            let autosD = this.autosParaLaVenta();
            let alcanzable = [];
            for(let i=0; i < autosD.length ; i++){
                if (this.puedeComprar(autosD[i],persona)){
                        alcanzable.push(autosD[i]);
                        console.log(alcanzable)}
            }
            return alcanzable;
    }
}