const notificacionesPost = (req, res) => {
  console.log(req.body);
  const noti = req.body;
  if (noti.event === "send_order" && noti.status === 200) {
    // TODO: manejar los pedidos
    const { data } = noti;

    const { items, payments } = data;

    const message = {
      id: data.orderId,
      items,
      payed: payments.length > 0,
    };

    if (message.payed) {
      message.total = payments[0].amount;
      message.tip = payments[0].tip;
    }

    console.log({ data, items, payments });

    console.log({ message });

    enviarPedido("tienda1", JSON.stringify(message));
  }

  res.json({
    ok: true,
  });
};

module.exports = {
  notificacionesPost,
};
