import { useMemo, useRef, useState, type FormEvent } from "react";
import { pricingPlans } from "../data/appData";

// Update your WhatsApp number here. Use country code and no plus sign.
const WHATSAPP_NUMBER = "03153206125";

// Replace this with your deployed Google Apps Script Web App URL.
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxrGNqc3ynvpfX9k_uk32Y8mVQzrIlxkFozyJ0xKyMzrBw1LLdwlelptfnUQew2wPsy/exec";
// Update bank account details here.
const BANK_DETAILS = {
  accountTitle: "The Trade School",
  bankName: "Bank Islami Pak Limited",
  accountNumber: "114400140520201",
  iban: "PK22BKIP0114400140520201",
};

// Update JazzCash number here.
const JAZZCASH_DETAILS = {
  accountTitle: "The Trade School",
  number: "03123100014",
};

// Update Easypaisa number here.
const EASYPAISA_DETAILS = {
  accountTitle: "Muzamil Hanif",
  number: "03123100014",
};

const paymentMethods = [
  "Bank Transfer",
  "JazzCash",
  "Easypaisa",
  "WhatsApp confirmation",
];

function formatPrice(price: number) {
  return `PKR ${price.toLocaleString()}`;
}

type PaymentProofPayload = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  selectedPlan: string;
  planPrice: string;
  planDuration: string;
  paymentMethod: string;
  transactionId: string;
  paymentScreenshot: {
    name: string;
    type: string;
    size: number;
    base64: string;
  };
};

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Unable to read payment screenshot."));
        return;
      }
      // Strip the prefix, send raw base64 only
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () =>
      reject(new Error("Unable to read payment screenshot."));
    reader.readAsDataURL(file);
  });
}

export function Checkout() {
  const selectedPlanFromUrl = new URLSearchParams(window.location.search).get(
    "plan",
  );
  const initialPlan =
    pricingPlans.find((plan) => plan.name === selectedPlanFromUrl) ??
    pricingPlans[0];

  const [selectedPlanName, setSelectedPlanName] = useState(initialPlan.name);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const paymentScreenshotRef = useRef<HTMLInputElement>(null);
  const selectedPlan = useMemo(
    () =>
      pricingPlans.find((plan) => plan.name === selectedPlanName) ??
      pricingPlans[0],
    [selectedPlanName],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const paymentScreenshot = paymentScreenshotRef.current?.files?.[0];
    if (!paymentScreenshot) {
      setSubmitError("Please upload your payment screenshot.");
      return;
    }

    if (!paymentScreenshot.type.startsWith("image/")) {
      setSubmitError("Please upload a valid image file.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
    const transactionId = String(
      formData.get("transactionId") || "Not provided",
    ).trim();
    const planPrice = formatPrice(selectedPlan.price.pkr);

    const message = [
      "Payment Proof Submission",
      "",
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `WhatsApp Number: ${whatsappNumber}`,
      `Selected Plan: ${selectedPlan.name}`,
      `Plan Price: ${planPrice}`,
      `Plan Duration: ${selectedPlan.duration}`,
      `Payment Method: ${paymentMethod}`,
      `Transaction ID: ${transactionId}`,
      "",
      "Request: I have paid for this membership plan. Please verify my payment and share access.",
    ].join("\n");

    try {
      setIsSubmitting(true);
      const paymentScreenshotBase64 = await readFileAsBase64(paymentScreenshot);

      const payload: PaymentProofPayload = {
        fullName,
        email,
        whatsappNumber,
        selectedPlan: selectedPlan.name,
        planPrice,
        planDuration: selectedPlan.duration,
        paymentMethod,
        transactionId,
        paymentScreenshot: {
          name: paymentScreenshot.name,
          type: paymentScreenshot.type,
          size: paymentScreenshot.size,
          base64: paymentScreenshotBase64,
        },
      };

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      // if (!response.ok) {
      //   throw new Error("Payment proof submission failed.");
      // }

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-5 py-10 text-[#080808] sm:py-14 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1480px] items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:gap-6">
        <div className="h-full rounded-[20px] border border-[#0899b8]/14 bg-white p-5 shadow-sm">
          <div className="mb-5 border-b border-[#080808]/8 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0899b8]">
              Checkout
            </p>
            <h1 className="mt-1 text-2xl font-black leading-none tracking-[-0.04em]">
              Complete your membership
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#080808]/46">
                Selected plan
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                {selectedPlan.name}
              </h2>
            </div>
            <div className="rounded-[14px] bg-[#080808] px-4 py-3 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Price
              </p>
              <p className="mt-1 text-2xl font-black text-[#0899b8]">
                {formatPrice(selectedPlan.price.pkr)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[16px] border border-[#080808]/8 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#080808]/46">
                Duration
              </p>
              <p className="mt-2 font-semibold">{selectedPlan.duration}</p>
            </div>
            <div className="rounded-[16px] border border-[#080808]/8 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#080808]/46">
                Discount
              </p>
              <p className="mt-2 font-semibold">{selectedPlan.discountText}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.12em]">
                Courses included
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#080808]/68">
                {selectedPlan.courses.map((course) => (
                  <li key={course}>- {course}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.12em]">
                Services included
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#080808]/68">
                {selectedPlan.services.map((service) => (
                  <li key={service}>- {service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-[16px] bg-[#eefbfe] p-4">
            <h3 className="text-sm font-black uppercase tracking-[0.12em]">
              Payment instructions
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#080808]/68">
              {selectedPlan.paymentInstructions.map((instruction) => (
                <li key={instruction}>- {instruction}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-full rounded-[18px] border border-[#080808]/10 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-black uppercase tracking-[0.12em] text-[#080808]">
            Payment methods
          </h3>
          <p className="mt-1 text-xs leading-5 text-[#080808]/56">
            Use any account below, then upload your payment screenshot.
          </p>

          <div className="mt-4 divide-y divide-[#080808]/8 rounded-[14px] border border-[#080808]/10">
            <div className="p-4">
              <p className="text-sm font-black text-[#080808]">Bank Transfer</p>
              <div className="mt-3 grid gap-2 text-sm text-[#080808]/72">
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Title</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {BANK_DETAILS.accountTitle}
                  </span>
                </p>
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Bank</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {BANK_DETAILS.bankName}
                  </span>
                </p>
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Account</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {BANK_DETAILS.accountNumber}
                  </span>
                </p>
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">IBAN</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {BANK_DETAILS.iban}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm font-black text-[#080808]">JazzCash</p>
              <div className="mt-3 grid gap-2 text-sm text-[#080808]/72">
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Title</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {JAZZCASH_DETAILS.accountTitle}
                  </span>
                </p>
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Number</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {JAZZCASH_DETAILS.number}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm font-black text-[#080808]">Easypaisa</p>
              <div className="mt-3 grid gap-2 text-sm text-[#080808]/72">
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Title</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {EASYPAISA_DETAILS.accountTitle}
                  </span>
                </p>
                <p className="flex items-start justify-between gap-4">
                  <span className="text-[#080808]/48">Number</span>
                  <span className="text-right font-semibold text-[#080808]">
                    {EASYPAISA_DETAILS.number}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm font-black text-[#080808]">
                WhatsApp confirmation
              </p>
              <p className="mt-2 text-sm leading-5 text-[#080808]/60">
                Submit your payment proof on WhatsApp after payment.
              </p>
            </div>
          </div>
        </div>

        <section className="h-full rounded-[18px] border border-[#0899b8]/16 bg-[#080808] p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
          <h2 className="text-xl font-black tracking-[-0.03em]">
            Customer details
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#cfcfcf]">
            Transaction ID is optional. All other fields are required.
          </p>

          <form className="mt-4 space-y-2" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Full Name
              </span>
              <input
                required
                name="fullName"
                className="mt-1 h-8 w-full rounded-[9px] border border-white/10 bg-white px-3 text-sm text-[#080808] outline-none focus:border-[#0899b8]"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                className="mt-1 h-8 w-full rounded-[9px] border border-white/10 bg-white px-3 text-sm text-[#080808] outline-none focus:border-[#0899b8]"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                WhatsApp Number
              </span>
              <input
                required
                name="whatsappNumber"
                className="mt-1 h-8 w-full rounded-[9px] border border-white/10 bg-white px-3 text-sm text-[#080808] outline-none focus:border-[#0899b8]"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Selected Plan
              </span>
              <select
                required
                name="selectedPlan"
                value={selectedPlanName}
                onChange={(event) => setSelectedPlanName(event.target.value)}
                className="mt-1 h-8 w-full rounded-[9px] border border-white/10 bg-white px-3 text-sm text-[#080808] outline-none focus:border-[#0899b8]"
              >
                {pricingPlans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Payment Method
              </span>
              <select
                required
                name="paymentMethod"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="mt-1 h-8 w-full rounded-[9px] border border-white/10 bg-white px-3 text-sm text-[#080808] outline-none focus:border-[#0899b8]"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Transaction ID
              </span>
              <input
                name="transactionId"
                placeholder="Optional"
                className="mt-1 h-8 w-full rounded-[9px] border border-white/10 bg-white px-3 text-sm text-[#080808] outline-none focus:border-[#0899b8]"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#cfcfcf]">
                Payment Screenshot
              </span>
              <input
                required
                ref={paymentScreenshotRef}
                type="file"
                name="paymentScreenshot"
                accept="image/*"
                className="mt-1 w-full rounded-[9px] border border-white/10 bg-white px-3 py-1.5 text-xs text-[#080808] outline-none file:mr-2 file:rounded-full file:border-0 file:bg-[#0899b8] file:px-3 file:py-1 file:text-[11px] file:font-black file:uppercase file:tracking-[0.08em] file:text-[#080808] focus:border-[#0899b8]"
              />
            </label>

            {submitError ? (
              <p className="rounded-[10px] border border-red-400/30 bg-red-500/12 p-2 text-xs leading-5 text-red-100">
                {submitError}
              </p>
            ) : null}

            <p className="rounded-[10px] border border-[#0899b8]/20 bg-[#0899b8]/10 p-2 text-xs leading-5 text-[#e8e8e8]">
              Payment is manually verified. Access will be shared after
              confirmation.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="motion-shine inline-flex w-full items-center justify-center rounded-full bg-[#0899b8] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#080808] transition hover:bg-[#13b2d1] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Payment Proof on WhatsApp"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
