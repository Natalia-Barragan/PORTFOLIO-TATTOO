import TypeformBooking from "@/components/typeform-booking"

export const metadata = {
  title: "Book Your Tattoo | INK Studio",
  description: "Book your tattoo with us. Simple, elegant form.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <TypeformBooking isQuickConsultation={false} />
    </main>
  )
}
