function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            ⚡ Power Outage Prediction System
          </h1>

          <p className="mt-2 text-blue-100 text-sm md:text-base">
            AI-powered outage risk prediction using live weather data across Karnataka
          </p>
        </div>

        {/* Right */}
        <div className="flex gap-3 flex-wrap">

          <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 text-center">
            <p className="text-xs text-blue-100 uppercase tracking-wide">
              Model
            </p>
            <p className="font-semibold">
              Random Forest
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 text-center">
            <p className="text-xs text-blue-100 uppercase tracking-wide">
              Weather
            </p>
            <p className="font-semibold">
              Live API
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 text-center">
            <p className="text-xs text-blue-100 uppercase tracking-wide">
              Region
            </p>
            <p className="font-semibold">
              Karnataka
            </p>
          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;