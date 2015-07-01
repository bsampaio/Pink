var PinkController = require('./controller/PinkController.js');
var Controller = new PinkController('lab');

while (Controller.ratoVivo && !Controller.acabouJogo){
  Controller.rodaTurno();
  console.log(Controller.getReport());
}
