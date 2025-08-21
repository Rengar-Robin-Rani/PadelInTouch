import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


export default async function HomePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ul>
        {todos?.map((todo) => (
          <li>{todo}</li>
        ))}
    </ul>
    </main>
  )
}
