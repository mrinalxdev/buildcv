import Link from "next/link"

export function DocsNavigation({ onNavigate }) {
  const sections = [
    { title: "Introduction", href: "#introduction" },
    { title: "Usage", href: "#getting-started" },
    { title: "Building Workflow", href: "#build-workflow" },
  ]

  return (
    <nav className="space-y-2 sticky top-4">
      {sections.map((section) => (
        <a
          key={section.href}
          href={section.href}
          className="block p-2 hover:bg-gray-100 rounded-md transition-colors text-sm md:text-base"
          onClick={(e) => {
            e.preventDefault()
            onNavigate(section.href.slice(1))
          }}
        >
          {section.title}
        </a>
      ))}
    </nav>
  )
}

