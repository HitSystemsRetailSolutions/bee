const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://63.33.116.171:1883");

const enviarPedido = (tienda, mensaje) => {
  client.publish("hit.orders/" + tienda, mensaje);
};

module.exports = {
  enviarPedido,
};
