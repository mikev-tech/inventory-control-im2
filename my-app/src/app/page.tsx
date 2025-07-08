export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Vinz and Vanz</h1>
        <nav className="space-x-4">
          <a href="/signin" className="text-gray-700 hover:text-black font-medium">
            Sign In
          </a>
          <a
            href="/signup"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Sign Up
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-white to-gray-100">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Timeless Elegance, Crafted For You</h2>
        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          Explore our handcrafted jewelry designed to capture beauty and moments. Start your journey with us today.
        </p>
        <a
          href="/signup"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()}Vinz and Vanz. All rights reserved.
      </footer>
    </main>
  );
}
