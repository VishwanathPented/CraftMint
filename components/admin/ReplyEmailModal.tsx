"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export function ReplyEmailModal({
  open,
  onClose,
  endpoint,
  recipientName,
  recipientEmail,
}: {
  open: boolean;
  onClose: () => void;
  endpoint: string;
  recipientName: string;
  recipientEmail: string;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleClose() {
    setSubject("");
    setMessage("");
    setError(null);
    setSent(false);
    onClose();
  }

  async function handleSend() {
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send email");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="reply-email-heading" className="max-w-lg bg-ivory p-6">
      <h2 id="reply-email-heading" className="font-display text-xl text-charcoal">
        Email {recipientName}
      </h2>
      <p className="mt-1 font-sans text-xs text-warm-grey">{recipientEmail}</p>

      {sent ? (
        <div className="mt-6">
          <p className="font-sans text-sm text-charcoal">Email sent.</p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 hairline px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="focus-ring hairline w-full bg-transparent px-3 py-2 font-sans text-sm text-charcoal"
          />
          <textarea
            placeholder="Message"
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="focus-ring hairline w-full resize-y bg-transparent px-3 py-2 font-sans text-sm text-charcoal"
          />
          {error && <p className="font-sans text-xs text-red-600">{error}</p>}
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              disabled={sending}
              onClick={handleSend}
              className="bg-charcoal px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-ivory disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send email"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
