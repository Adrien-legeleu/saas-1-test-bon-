"use server";

import { redirect } from "next/dist/server/api-utils";
import { getUser } from "./actionsUsers";
import { prisma } from "./prisma";
import { getStripeSession, stripe } from "./stripe";
import { NextApiResponse } from "next";

export const getDataStripeuser = async (userid: string) => {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userid,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });
  return data;
};

export const createSubscription = async (res: NextApiResponse) => {
  const user = await getUser();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      stripeCustomerId: true,
    },
  });
  const subscriptionUrl = await getStripeSession({
    customerId: dbUser?.stripeCustomerId as string,
    domainUrl: "http://localhost:3000",
    priceId: process.env.STRIPE_API_KEY as string,
  });
  return redirect(res, 302, subscriptionUrl);
};

export const createCustomerPortal = async (res: NextApiResponse) => {
  const user = await getUser();
  const session = await stripe.billingPortal.sessions.create({
    customer: user?.stripeCustomerId as string,
    return_url: "http///localhost:3000/dashboard/payment",
  });
  return redirect(res, 302, session.url);
};
