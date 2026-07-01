import { waLink } from "@/lib/data";

export default function WaFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[var(--ease-apple)] hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.9.9.9-4.8-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C4.7 9.9 9.9 4.7 16 4.7S27.3 9.9 27.3 16 22.1 24.8 16 24.8zm6.2-8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.8-1.9-1-2.6c-.3-.7-.5-.6-.8-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.2 1 3.1 1 4.2.9.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z" />
      </svg>
    </a>
  );
}
