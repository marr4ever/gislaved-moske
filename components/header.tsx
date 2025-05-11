import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-blue-700 text-white p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Gislaved Moské
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-200">Hem</Link>
          <Link href="/bonetider" className="hover:text-blue-200">Bönetider</Link>
          <Link href="/kontakta-oss" className="hover:text-blue-200">Kontakta oss</Link>
          <Link href="/tv" className="hover:text-blue-200">TV</Link>
        </div>
      </nav>
    </header>
  )
}
