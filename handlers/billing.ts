import Stripe from "stripe";
import handler from "../libs/handler-lib";
import { calculateCost } from "../libs/billing-lib";
import { STRIPE_SECRET_KEY } from "../constants";
import { BadRequest } from "../errors";

export const main = handler(async (event) => {
  if (!event.body) {
    return BadRequest("Event body must be provided");
  }

  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02",
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });
  return { status: true };
});
