export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6 text-white">
      <div className="text-center max-w-xl">
        <div className="relative inline-block">
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter">
            404
          </h1>

          <div className="absolute -top-6 -right-8 text-5xl animate-bounce">
            🚀
          </div>
        </div>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Houston, we have a problem.
        </h2>

        <p className="mt-4 text-gray-400 text-lg">
          The page you're looking for has vanished into the void.
          <br />
          Or maybe it never existed. 👀
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-block mt-8 rounded-full bg-white px-7 py-3
                     font-semibold text-black transition-all
                     hover:scale-105 hover:bg-gray-200"
        >
          🚀 Take me home
        </a>
        <p className="mt-8 text-sm text-gray-600">
          Error 404: Page.exe has stopped responding.
        </p>
      </div>
    </main>
  );
}