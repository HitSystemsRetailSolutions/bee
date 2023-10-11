const notificacionesPost = (req, res) => {
  console.log(req.body);
  const noti = req.body;
  if (noti.event === "send_order" && noti.status === 200) {
    // TODO: manejar los pedidos
    // recojemos la informacion de los pedidos
    const { data } = noti;
    const { items, payments } = data;
    // montamos el mensaje a enviar
    const message = {
      id: data.orderId,
      items,
      payed: payments.length > 0,
    };
    // si el pedido esta pagado, añadimos el total y la propina
    if (message.payed) {
      message.total = payments[0].amount;
      message.tip = payments[0].tip;
    }
    // TODO: añadir la mesa o si es para llevar
    // TODO: eliminar el console.log, son solo para desarrollo
    console.log({ data, items, payments });
    console.log({ message });
    // enviamos el mensaje a la tienda por mqtt
    enviarPedido("tienda1", JSON.stringify(message));
  }

  res.json({
    ok: true,
  });
};

module.exports = {
  notificacionesPost,
};
