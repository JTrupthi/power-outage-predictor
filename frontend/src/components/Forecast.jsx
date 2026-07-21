function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  const getIcon = (description) => {
    const text = description.toLowerCase();

    if (text.includes("thunder")) return "⛈️";
    if (text.includes("rain")) return "🌧️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("clear")) return "☀️";
    if (text.includes("mist")) return "🌫️";
    if (text.includes("fog")) return "🌫️";
    if (text.includes("snow")) return "❄️";

    return "🌤️";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6">
        📅 5-Day Weather Forecast
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl p-5 shadow hover:shadow-lg transition duration-300 text-center"
          >
            <h3 className="font-semibold text-lg">
              {new Date(day.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </h3>

            <div className="text-5xl my-4">
              {getIcon(day.description)}
            </div>

            <p className="text-3xl font-bold text-blue-700">
              {day.temp}°C
            </p>

            <p className="capitalize mt-3 text-gray-700">
              {day.description}
            </p>

            <div className="mt-4 text-sm text-gray-600">
              💧 Humidity: {day.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;