"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el mensaje")
      }

      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      })

      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})
    } catch (error) {
      console.error("Contact error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar el mensaje",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Icons.MapPin,
      title: "Dirección",
      content: "Lavalle 123, Rosario, Santa Fe",
      subContent: "Argentina",
    },
    {
      icon: Icons.Phone,
      title: "Teléfono",
      content: "+54 341 555-1234",
      subContent: "Lunes a Domingo",
    },
    {
      icon: Icons.Mail,
      title: "Email",
      content: "contacto@lavallepadelclub.com",
      subContent: "Respuesta en 24hs",
    },
    {
      icon: Icons.Clock,
      title: "Horarios",
      content: "8:00 - 23:00",
      subContent: "Todos los días",
    },
  ]

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contacto</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Información de contacto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                          <p className="text-white font-medium">{info.content}</p>
                          <p className="text-gray-300 text-sm">{info.subContent}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Envianos un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Nombre completo *</Label>
                    <Input
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className=" space-y-2">
                      <Label>Email</Label>
                      <Input
                        placeholder="tu@email.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2  ">
                      <Label>Teléfono</Label>
                      <Input
                        placeholder="Tu teléfono"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <Label>Mensaje *</Label>
                    <Textarea
                      placeholder="Escribí tu consulta aquí..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-black/30" size="lg">
                    <Icons.Send />
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-7xl mx-auto">
        <Card className="overflow-hidden mx-4 sm:mx-6 lg:mx-8">
          <CardContent className="">
            <div className="h-96 bg-muted/50 flex items-center justify-center relative">
                <iframe
                  style={{ border: 0}}
                  id="map"
                  src="https://www.google.com/maps/d/u/0/embed?mid=1sAZWbdNbo9cbN6Pv_WGXOF-TlkGQ2vE&ehbc=2E312F"
                  width="100%"
                  height="100%"
                  loading="lazy"
                ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
