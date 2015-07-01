var PinkController = require('./controller/PinkController');
var Controller = new PinkController('lab');

while (Controller.ratoVivo && !Controller.acabouJogo){
  Controller.rodaTurno();
  console.log(Controller.getReport());
}
