"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Paystack from "@paystack/inline-js";

export default function Payment() {
  const router = useRouter();
  const amount = 2000; // ₦2,000
  const email = "customer@example.com";
  const fullName = "John Doe";

  const handlePay = async () => {
    try {
      // instantiate the popup
      const popup = new Paystack();

      // call newTransaction (this opens the popup; it does NOT return an "open" handler)
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxx", // set in .env
        email,
        amount: amount * 100, // Paystack expects lowest unit (kobo/cents)
        currency: "NGN",
        firstName: fullName.split(" ")[0] ?? "",
        lastName: fullName.split(" ").slice(1).join(" ") ?? "",
        // optional customer phone, metadata...
        onLoad: (info: any) => {
          // popup loaded (optional)
          console.log("Popup loaded:", info);
        },
        // inside your onSuccess handler in components/payment.tsx
        onSuccess: async (transaction: any) => {
          const reference = transaction.reference ?? transaction.trxref ?? null;
          if (!reference) {
            console.error(
              "No transaction reference in Paystack response",
              transaction
            );
            alert("Payment returned no reference. Contact support.");
            return;
          }

          const url = "https://jungleparadise.xyz/verify_payment.php";
          const payload = { reference };

          async function postVerify() {
            try {
              const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                // credentials: 'include' // only if you need cookies/auth
              });

              // If the network succeeds but server returns non-2xx, handle it
              const text = await res.text(); // read raw so we can log malformed JSON
              let json;
              try {
                json = text ? JSON.parse(text) : null;
              } catch (err) {
                console.error("Response was not valid JSON:", text);
                throw new Error(`Invalid JSON response (status ${res.status})`);
              }

              if (!res.ok) {
                console.error("Server returned error", res.status, json);
                throw new Error(json?.error ?? `Server error: ${res.status}`);
              }

              if (json.saved) {
                // success
                router.push(`/address?ref=${encodeURIComponent(reference)}`);
                return;
              } else {
                console.error("Verify endpoint returned unexpected body", json);
                throw new Error("Verification failed on server");
              }
            } catch (err: any) {
              console.error("verify request failed:", err);
              throw err;
            }
          }

          // try once, then one retry
          try {
            await postVerify();
          } catch (firstErr) {
            console.warn(
              "First verify attempt failed — retrying once...",
              firstErr
            );
            try {
              await postVerify();
            } catch (secondErr) {
              alert(
                "Could not verify payment. Please contact support and provide this reference: " +
                  reference
              );
              // optionally show a small UI with the reference and a "Retry" button
            }
          }
        },

        onCancel: () => {
          console.log("User cancelled payment");
        },
        onError: (err: any) => {
          console.error("Paystack error", err);
          alert("Payment error. See console for details.");
        },
      });

      // DO NOT call something like handler.openIframe(); newTransaction already handles opening
    } catch (err) {
      console.error("Paystack init error", err);
      alert("Payment initialization error. Check console.");
    }
  };

  return (
    <div>
      <h2>Buy item — ₦{amount.toLocaleString()}</h2>
      <p>Test email: {email}</p>
      <button onClick={handlePay} style={{ padding: 10, fontSize: 16 }}>
        Pay with Paystack
      </button>
    </div>
  );
}
