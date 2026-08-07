import { BUSINESS_PHONE } from '@/lib/seo'

const whatsappNumber = BUSINESS_PHONE.replace(/\D/g, '')
const whatsappMessage = encodeURIComponent('Hi Bright Lawn, I would like to request a quote.')

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Bright Lawn on WhatsApp"
      className="whatsapp-float group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#25D366]/30 focus-visible:outline-none active:scale-95 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-6 sm:h-14 sm:w-auto sm:gap-2.5 sm:px-5"
    >
      <span className="whatsapp-pulse" aria-hidden="true" />
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="relative z-10 size-6"
        fill="currentColor"
      >
        <path d="M16.01 3.2A12.67 12.67 0 0 0 5.1 22.32L3.43 28.8l6.64-1.58A12.67 12.67 0 1 0 16.01 3.2Zm0 23.12a10.43 10.43 0 0 1-5.32-1.46l-.38-.23-3.94.94 1-3.84-.25-.4A10.43 10.43 0 1 1 16 26.32Zm5.72-7.8c-.31-.16-1.84-.91-2.13-1.01-.28-.11-.49-.16-.7.15-.2.31-.8 1.01-.98 1.22-.18.2-.36.23-.67.07-.31-.15-1.31-.48-2.49-1.54a9.36 9.36 0 0 1-1.72-2.14c-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.61-.5-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.57 0 1.51 1.1 2.97 1.25 3.18.16.2 2.17 3.31 5.25 4.64.73.32 1.3.51 1.75.65.74.23 1.41.2 1.94.12.59-.09 1.84-.75 2.1-1.48.26-.72.26-1.34.18-1.48-.08-.13-.28-.21-.59-.36Z" />
      </svg>
      <span className="relative z-10 hidden text-sm font-extrabold sm:inline">WhatsApp</span>
    </a>
  )
}
