
/*Imports: */

var rl = require('./readLab');

//Funcao construtora
var Labirinto = function (lab, tabCustos) {

  var Pos = function(x, y){
    return {"x":x,"y":y};
  };

  this.acharChar = function(c){
    c = c.toUpperCase();
    for (var i = 0; i < this.labirinto.length; i++) {
      for (var j = 0; j < this.labirinto[i].length; j++) {
        var currChar = this.labirinto[i][j];
        if(currChar === c){
          return new Pos(i,j);
        }
      }
    }
  };

  this.moverRato = function(newPos){
    this.rato = newPos;
  };

  this.criarGato = function(){
    var x_maximum = this.labirinto[0].length-1;
    var y_maximum = this.labirinto.length-1;
    var minimum = 0;

    var x = Math.floor(Math.random() * (x_maximum - minimum )) + minimum;
    var y = Math.floor(Math.random() * (y_maximum - minimum )) + minimum;

    if(this.labirinto[x][y] == '0'){
      return this.criarGato();
    }

    return new Pos(x,y);
  };

  this.possiveisMovimentos = function (pos){
    var possiveis = [];
    var posX, posY;
    posX = pos.x;
    posY = pos.y;

    [this.movimentos.cima, this.movimentos.esquerda].forEach(function(m, index, array){
      var x, y;
      x = (m.x + posX);
      y = (m.y + posY);

      if(this.labirinto[y][x] !== '0'){
        possiveis.push(new Pos(x,y));
      }
    });

    return possiveis;
  };

  this.fazRotas = function(pos){
    var rotas = [];

    var loop = (function (self) {
      return function(pos, r){
        r.push(pos);
        if(pos == self.rato){
          rotas.push(r);
        }else{
          var pMovimentos = self.possiveisMovimentos(pos);
          for (var i = 0; i < pMovimentos.length; i++) {
            var mov = pMovimentos[i];
            loop(mov, r);
          }
        }
      };
    }(this));

    loop(this.fim, []);
    return rotas;
  };

  this.calcularCustoRota = function(rota){
    peso = 0;
    for (var p in rota) {
      if(p == this.gato){
        peso = peso + Infinity;
      }else{
        peso = peso + parseInt(this.tabelaCustos[p.x][p.y]);
      }
    }

    return peso;
  };

  this.acharMenorRota = function(pos){
    rotasPossiveis = this.fazRotas(pos);

    if(rotasPossiveis.length === 0){
      console.log("!!! Não tem rotas !!!");
      return;
    }

    menorRota = rotasPossiveis[0];
    menorPesoRota = this.calcularCustoRota(menorRota);

    for (var i = 0; i < rotasPossivels.length; i++) {
      var p = rotasPossivels[i];
      var pesoRota = this.calcularCustoRota(p);

      if (menorPesoRota > pesoRota) {
        menorPesoRota = pesoRota;
        menorRota = p;
      }
    }

    return {
      "menorRota":menorRota,
      "menorPesoRota":menorPesoRota
    };
  };

  this.labirinto = lab;
  this.tabelaCustos = tabCustos;
  this.inicio = this.acharChar('S');
  this.fim = this.acharChar('F');
  this.rato = this.inicio;
  this.gato = this.criarGato();

  this.movimentos = {
    cima:{ x:0, y:-1 },
    baixo:{ x:0, y:1 },
    direita:{ x:1, y:0},
    esquerda:{ x:-1, y:0}
  };

  this.printLabirinto = function(){console.log(this.labirinto)};
  this.printTabelaCustos = function(){console.log(this.tabelaCustos)};
};

var LabirintoFactory = function(filename){
  this.file = rl.carregarArquivo(filename);
  this.getLabirinto = function(){
    return new Labirinto(this.file.labirinto, this.file.tabelaCustos);
  };
};

module.exports = LabirintoFactory;
