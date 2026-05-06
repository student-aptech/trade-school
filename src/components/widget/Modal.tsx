type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/55 px-5 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="motion-success-card w-full max-w-[420px] rounded-[22px] bg-white p-6 text-center text-[#080808] shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf9ed]">
          <svg
            className="success-check h-11 w-11 text-[#16a34a]"
            viewBox="0 0 52 52"
            aria-hidden="true"
          >
            <circle
              className="success-check-circle"
              cx="26"
              cy="26"
              r="23"
              fill="none"
            />
            <path
              className="success-check-mark"
              fill="none"
              d="M15 27.5 22.5 35 38 18"
            />
          </svg>
        </div>

        <p className="checkout-small-heading mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#0899b8]">
          Form submitted
        </p>
        <h2
          id="success-modal-title"
          className="modal-heading mt-2 text-2xl font-black tracking-[-0.03em]"
        >
          Great, proof received
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#080808]/68">
          You have completed the payment proof step. Our team will manually
          verify your screenshot, transaction details, and selected plan before
          sharing access.
        </p>
        <p className="mt-3 rounded-[14px] bg-[#eefbfe] p-3 text-sm leading-5 text-[#080808]/70">
          Verification is done by matching your payment account and WhatsApp
          details. Keep your receipt available until access is confirmed.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="checkout-small-heading mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#080808] px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#0899b8]"
        >
          Done
        </button>
      </div>
    </div>
  );
}
