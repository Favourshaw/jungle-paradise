// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// export default function Confirm() {
//   const router = useRouter();
//   const { ref } = router.query;

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     address_line1: "",
//     address_line2: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // If ref not present after a short time, you could redirect back
//     // Here we just allow the user to fill in reference manually if needed.
//   }, [ref]);

//   const onChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!ref) {
//       alert("Missing payment reference.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("https://jungleparadise.xyz/save_address.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reference: ref, ...form }),
//       });
//       const data = await res.json();
//       if (res.ok && data.saved) {
//         alert("Address saved — thank you!");
//         router.push("/thank-you"); // optional thank-you page
//       } else {
//         console.error("Save failed", data);
//         alert("Failed to save address. Contact support.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Network error while saving address.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main style={{ padding: 24 }}>
//       <h1>Enter your shipping address</h1>
//       <p>
//         Payment reference: <strong>{ref ?? "—"}</strong>
//       </p>
//       <form onSubmit={submit} style={{ maxWidth: 600 }}>
//         <input
//           name="full_name"
//           placeholder="Full name"
//           onChange={onChange}
//           required
//         />
//         <input name="email" placeholder="Email" onChange={onChange} required />
//         <input name="phone" placeholder="Phone" onChange={onChange} />
//         <input
//           name="address_line1"
//           placeholder="Address line 1"
//           onChange={onChange}
//           required
//         />
//         <input
//           name="address_line2"
//           placeholder="Address line 2"
//           onChange={onChange}
//         />
//         <input name="city" placeholder="City" onChange={onChange} required />
//         <input name="state" placeholder="State" onChange={onChange} />
//         <input
//           name="postal_code"
//           placeholder="Postal code"
//           onChange={onChange}
//         />
//         <input
//           name="country"
//           placeholder="Country"
//           onChange={onChange}
//           required
//         />
//         <div style={{ marginTop: 12 }}>
//           <button type="submit" disabled={loading}>
//             {loading ? "Saving…" : "Save address"}
//           </button>
//         </div>
//       </form>
//       <style jsx>{`
//         input {
//           display: block;
//           width: 100%;
//           margin: 8px 0;
//           padding: 8px;
//         }
//         button {
//           padding: 8px 12px;
//         }
//       `}</style>
//     </main>
//   );
// }

import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
