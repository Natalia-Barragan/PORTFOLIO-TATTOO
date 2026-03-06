"use client"

import { useState } from "react"
import BookingChoice from "./booking-choice"
import TypeformBooking from "./typeform-booking"

export default function BookingWrapper() {
  // Render only the Typeform-style booking flow (full booking)
  const [noop] = useState(false)
  return <TypeformBooking isQuickConsultation={false} onBack={() => {}} />
}
