import Link from "next/link"
import { Icons } from "@/components/icons"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl">Lavalle Padel Club</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Las mejores canchas de pádel en Rosario. Superficie de alto rendimiento, iluminación profesional y una
              comunidad apasionada por el deporte.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Icons.Facebook />
              </Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Icons.Instagram />
              </Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Icons.Twitter />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-background/80 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#sobre-nosotros" className="text-background/80 hover:text-primary transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#reservar" className="text-background/80 hover:text-primary transition-colors">
                  Reservar cancha
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-background/80 hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Icons.MapPin />
                <span className="text-background/80">Lavalle 123, Rosario, Santa Fe</span>
              </li>
              <li className="flex items-center space-x-3">
                <Icons.Phone />
                <span className="text-background/80">+54 341 555-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Icons.Mail />
                <span className="text-background/80">contacto@lavallepadelclub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">© 2024 Lavalle Padel Club. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
