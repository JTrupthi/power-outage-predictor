function PredictionCard({
  prediction,
  confidence,
  weather,
  district,
}) {
  const getColor = () => {
    switch (prediction) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  const getBadge = () => {
    switch (prediction) {
      case "High":
        return "bg-red-100 text-red-700 border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getEmoji = () => {
    switch (prediction) {
      case "High":
        return "🔴";
      case "Medium":
        return "🟡";
      case "Low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return "🌤";

    const condition = weather.description.toLowerCase();

    if (condition.includes("rain")) return "🌧";
    if (condition.includes("cloud")) return "☁";
    if (condition.includes("thunder")) return "⛈";
    if (condition.includes("mist")) return "🌫";
    if (condition.includes("fog")) return "🌫";
    if (condition.includes("clear")) return "☀";
    if (condition.includes("snow")) return "❄";

    return "🌤";
  };

  const getRecommendations = () => {
    switch (prediction) {
      case "High":
        return [
          "Activate backup generators",
          "Alert maintenance teams",
          "Prepare emergency response",
        ];

      case "Medium":
        return [
          "Monitor weather conditions",
          "Keep emergency lights ready",
          "Inform maintenance teams",
        ];

      case "Low":
        return [
          "No immediate action required",
          "Continue routine monitoring",
          "Maintain normal operations",
        ];

      default:
        return [];
    }
  };

  const now = new Date();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        📊 Live Prediction Dashboard
      </h2>

      {!prediction ? (
        <div className="text-center text-gray-500 py-16">
          <h3 className="text-xl font-semibold">
            No Prediction Yet
          </h3>

          <p className="mt-3">
            Select a district and click
            <span className="font-bold text-blue-600">
              {" "}Predict Risk
            </span>
          </p>
        </div>
      ) : (
        <>
          {/* Risk Summary */}

          <div className="text-center">

            <div className="text-7xl">
              {getEmoji()}
            </div>

            <h2 className="text-3xl font-bold mt-4">
              📍 {district}
            </h2>

            <div
              className={`inline-block mt-5 px-6 py-2 rounded-full border font-bold text-lg ${getBadge()}`}
            >
              {prediction.toUpperCase()} RISK
            </div>

            {/* Confidence */}

            <div className="mt-8">

              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  🎯 Confidence
                </span>

                <span className="font-bold text-blue-600">
                  {confidence}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-700"
                  style={{
                    width: `${confidence}%`,
                  }}
                ></div>

              </div>

            </div>

            {/* Last Updated */}

            <div className="mt-5 text-gray-500 text-sm">
              🕒 Last Updated
              <br />
              {now.toLocaleDateString()}
              {" • "}
              {now.toLocaleTimeString()}
            </div>

          </div>

          {/* Weather */}

          {weather && (

            <div className="mt-8 border rounded-2xl p-5 bg-gray-50">

              <h3 className="text-2xl font-bold mb-5">
                {getWeatherIcon()} Live Weather
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  🌡
                  <p className="font-semibold mt-2">
                    Temperature
                  </p>

                  <p className="text-xl font-bold">
                    {weather.temperature}°C
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  💧
                  <p className="font-semibold mt-2">
                    Humidity
                  </p>

                  <p className="text-xl font-bold">
                    {weather.humidity}%
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  🌬
                  <p className="font-semibold mt-2">
                    Wind Speed
                  </p>

                  <p className="text-xl font-bold">
                    {weather.wind_speed} km/h
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  🌧
                  <p className="font-semibold mt-2">
                    Rainfall
                  </p>

                  <p className="text-xl font-bold">
                    {weather.rainfall} mm
                  </p>
                </div>

              </div>

              <div className="mt-5 bg-white rounded-xl shadow p-4">

                <p className="font-semibold">
                  Weather Condition
                </p>

                <p className="text-xl capitalize mt-2">
                  {getWeatherIcon()} {weather.description}
                </p>

              </div>

            </div>

          )}

          {/* Recommendations */}

          <div className="mt-8">

            <h3 className="text-2xl font-bold mb-4">
              💡 Recommendations
            </h3>

            <div className="space-y-3">

              {getRecommendations().map((item, index) => (

                <div
                  key={index}
                  className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg"
                >
                  ✅ {item}
                </div>

              ))}

            </div>

          </div>

        </>
      )}
    </div>
  );
}

export default PredictionCard;