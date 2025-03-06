return (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">My Blog</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  </header>
)