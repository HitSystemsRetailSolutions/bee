const { Router } = require("express");
const { notificacionesPost } = require("../controllers/notificaciones");

const router = Router();

router.post("/", notificacionesPost);
router.post("/:id", notificacionesPost);

module.exports = router;
