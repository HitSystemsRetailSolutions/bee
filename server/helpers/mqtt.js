const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://63.33.116.171:1883");

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

const enviarPedido = (tienda, mensaje) => {
  client.publish("hit.orders/" + tienda, mensaje);
};

module.exports = {
  enviarPedido,
};
