// app/api/paystack/route.ts
import { NextResponse } from "next/server";

type Body = {
  email?: string;
  amountNgn?: number;
  ticketType?: string;
};

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    if (!body?.email || !body?.amountNgn) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET) {
      console.error("Missing PAYSTACK_SECRET_KEY in environment");
      return NextResponse.json(
        { message: "Server misconfigured" },
        { status: 500 }
      );
    }

    // Paystack expects amount in kobo (Naira * 100)
    const amountKobo = Math.round(Number(body.amountNgn) * 100);

    const payload = {
      email: body.email,
      amount: amountKobo,
      // optional metadata — useful to pass ticket type, etc.
      metadata: {
        ticketType: body.ticketType || "early",
      },
      // you can set callback_url to return to your site after payment
      // e.g. callback_url: "https://yourdomain.com/verify"
    };

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Paystack init error", data);
      return NextResponse.json(
        { message: data?.message || "Paystack error" },
        { status: 502 }
      );
    }

    // data.data.authorization_url contains the redirect URL
    return NextResponse.json(data.data);
  } catch (err) {
    console.error("Paystack route error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
