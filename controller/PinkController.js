
var PinkController = function(filename){
  var LabirintoFactory = require('../models/Labirinto');
  var labirinto = new LabirintoFactory(filename).getLabirinto();
  this.labirinto = labirinto;
  this.ratoVivo = true;
  this.acabouJogo = false;
  this.rota = [];

  this.perdeuJogo = function(){
    this.ratoVivo = false;
    this.acabouJogo = true;
  };

  this.ganhouJogo = function(){
    this.acabouJogo = true;
  };

  this.rodaTurno = function(){
    if(! this.acabouJogo){
      try {
        var menorRota = this.labirinto.acharMenorRota(this.labirinto.rato);
        var route = menorRota.menorRota;
        var weight = menorRota.menorPesoRota;
      } catch (e) {
        console.log(e);
        this.perdeuJogo();
        return;
      }

      this.labirinto.gato = this.labirinto.gerarGato();
      this.labirinto.moverRato(rota[rota.length-2]);
      this.rota.push(rota[rota.length-2]);

      if(this.labirinto.gato == this.labirinto.rato){
        this.perdeuJogo();
      }

      if(this.labirinto.rato == this.labirinto.fim){
        this.ganhouJogo();
      }
    }
  };

  this.getGatoPos = function(){
    return this.labirinto.gato;
  };

  this.getRatoPos = function(){
    return this.labirinto.rato;
  };

  this.getLabirinto = function(){
    return this.labirinto.labirinto;
  };

  this.getTabelaCustos = function(){
    return this.labirinto.tabelaCustos;
  };

  this.checkPerdeuJogo = function(){
    return (this.getGatoPos() == this.getRatoPos());
  };

  this.getReport = function(){
    return {
      "catPosition":this.getGatoPos(),
      "mousePosition":this.getRatoPos(),
      "labyrinth":this.getLabirinto(),
      "costs":this.getTabelaCustos()
    };
  };

  if(this.checkPerdeuJogo()){
    this.perdeuJogo();
  }
};


module.exports = PinkController;
