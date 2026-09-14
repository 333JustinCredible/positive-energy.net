import { Router, type IRouter } from "express";
import {
  createContactDeliveryService,
} from "../lib/contact-delivery";

const router: IRouter = Router();
const contactDelivery = createContactDeliveryService();

router.post("/contact", async (req, res) => {
  const result = await contactDelivery.submit(
    req.body,
    req.ip || "unknown",
    {
      scriptUrl: process.env["GOOGLE_APPS_SCRIPT_URL"],
      scriptSecret: process.env["GOOGLE_APPS_SCRIPT_SECRET"],
    },
  );
  res.status(result.status).json(result.body);
});

export default router;