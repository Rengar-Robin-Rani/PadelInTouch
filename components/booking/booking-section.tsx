"use client"

import { useState } from "react"
import { BookingSearch } from "./booking-search"
import { SlotsList } from "./slots-list"
import { BookingDialog } from "./booking-dialog"
import { useToast } from "@/hooks/use-toast"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  price: number
  startUtc: string
  endUtc: string
}

export function BookingSection() {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (clubId: string, courtId: string, date: string) => {
    setIsLoading(true)
    setHasSearched(true)
    try {
      const response = await fetch(`/api/availability?clubId=${clubId}&courtId=${courtId}&date=${date}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al buscar disponibilidad")
      }

      setSlots(data.slots || [])
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al buscar disponibilidad",
        variant: "destructive",
      })
      setSlots([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setIsDialogOpen(true)
  }

  const handleBookingSuccess = (bookingId: string) => {
    // Remove the booked slot from the list
    setSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== selectedSlot?.id))
    setSelectedSlot(null)

    toast({
      title: "¡Reserva confirmada!",
      description: `Tu reserva ha sido creada. ID: ${bookingId.slice(0, 8)}...`,
    })
  }

  return (
    <section id="reservar" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Reservá tu cancha</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seleccioná la sucursal, cancha y fecha para ver los horarios disponibles.
          </p>
        </div>

        <div className="space-y-12">
          <BookingSearch onSearch={handleSearch} isLoading={isLoading} />

          {hasSearched && <SlotsList slots={slots} onBookSlot={handleBookSlot} isLoading={isLoading} />}
        </div>

        <BookingDialog
          slot={selectedSlot}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      </div>
    </section>
  )
}
