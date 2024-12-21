'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { DocsHeader } from '@/components/documentation/DocHeader'
import { DocsContent } from '@/components/documentation/DocContent'
import { DocsNavigation } from '@/components/documentation/DocNavigation'

export default function DocumentationPage() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const sectionRefs = useRef({})

  const scrollToSection = (sectionId) => {
    setIsNavOpen(false)
    const sectionRef = sectionRefs.current[sectionId]
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleHashChange = () => {
      const sectionId = window.location.hash.slice(1)
      scrollToSection(sectionId)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <DocsHeader />
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 md:gap-12">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden self-start mb-4"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
        <aside className={`md:w-1/4 ${isNavOpen ? 'block' : 'hidden'} md:block`}>
          <DocsNavigation onNavigate={scrollToSection} />
        </aside>
        <main className="flex-1 md:border-l md:border-gray-200 md:pl-8">
          <DocsContent sectionRefs={sectionRefs} />
        </main>
      </div>
    </div>
  )
}

