import TypeformBooking from "@/components/typeform-booking"

export const metadata = {
  title: "Reserva Tu Tatuaje | Coni Pérez",
  description: "Reserva tu tatuaje de forma simple y elegante.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <TypeformBooking isQuickConsultation={false} />
    </main>
  )
}
