import { useState } from "react";

import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";
import PredictionCard from "../components/PredictionCard";
import WeatherAnalytics from "../components/WeatherAnalytics";
import Forecast from "../components/Forecast";
import KarnatakaMap from "../components/KarnatakaMap";

function Home() {
  const [predictionData, setPredictionData] = useState({
    district: "",
    predicted_risk: "",
    confidence: 0,
    weather: null,
    forecast: [],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            ⚡ Power Outage Prediction Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            AI-powered outage prediction using live weather data for Karnataka districts.
          </p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <PredictionForm setPrediction={setPredictionData} />

          <PredictionCard
            prediction={predictionData.predicted_risk}
            confidence={predictionData.confidence}
            weather={predictionData.weather}
            district={predictionData.district}
          />
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <WeatherAnalytics weather={predictionData.weather} />
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <Forecast forecast={predictionData.forecast} />
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <KarnatakaMap
            prediction={predictionData.predicted_risk}
            district={predictionData.district}
          />
        </div>

      </main>
    </div>
  );
}

export default Home;