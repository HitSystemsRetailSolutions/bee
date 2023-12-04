const { enviarPedido } = require("../helpers/mqtt");
const { recHit } = require("../mssql/mssql");

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
    enviarPedido(id || "904", JSON.stringify(message));

    // insertamos el pedido en la base de datos para imprimir

    console.log("enviando a la BBDD...");
    const date = new Date();
    let ticket = `
    [magnify: width 2; height 2]
    [column: left HONEI; right Hora ${date.getHours()}:${date.getMinutes()}]
    [column: left - Large; right * 1 \[ \]; indent 60]
    `;

    console.log(items);
    items.forEach((item) => {
      if (item.modifiers) {
        console.log(items.modifiers);
        ticket += `[column: left > ${item.name}; right * ${item.quantity} \[ \]]`;
        item.modifiers.forEach((mod) => {
          ticket += `[column: left - ${mod.name}; right * ${mod.quantity} \[ \]; indent 60]`;
        });
      } else {
        ticket += `[column: left > ${item.name}; right * ${item.quantity} \[ \]]`;
      }
    });

    ticket += "[cut: feed; partial]";

    recHit(
      "fac_demo",
      `INSERT INTO impresoraCola (id, Impresora, Texte, tmstpeticio) VALUES (newid(),'904_bocadillo', '${ticket}', getdate())`
    );
  }

  res.json({
    ok: true,
  });
};

module.exports = {
  notificacionesPost,
};
