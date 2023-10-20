const { enviarPedido } = require("../helpers/mqtt");

const notificacionesPost = (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const noti = req.body;
  if (noti.event === "send_order" && noti.status === 200) {
    // recojemos la informacion de los pedidos
    const { data } = noti;
    const { items, payments } = data;
    // montamos el mensaje a enviar
    const message = {
      id: data.orderId,
      items,
      payed: payments.length > 0,
      table: data.type === "table_ordering" ? data.tableInfo.tableId : null,
    };
    // si el pedido esta pagado, añadimos el total y la propina
    if (message.payed) {
      message.total = payments[0].amount;
      message.tip = payments[0].tip;
    }
    // enviamos el mensaje a la tienda por mqtt
    enviarPedido(id || "tienda1", JSON.stringify(message));
  }

  res.json({
    ok: true,
  });
};

module.exports = {
  notificacionesPost,
};
