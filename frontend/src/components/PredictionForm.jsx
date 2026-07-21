import { useState } from "react";
import API from "../services/api";

const districts = [
  "Bagalkot",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Vijayanagara",
  "Yadgir",
];

function PredictionForm({ setPrediction }) {
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!district) {
      setError("Please select a district.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/predict", {
        district,
      });

      setPrediction(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Unable to fetch prediction. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-300">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        ⚡ Live Power Outage Prediction
      </h2>

      <p className="text-gray-500 mb-6">
        Select a Karnataka district to generate a live weather-based outage
        prediction.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            District
          </label>

          <select
            value={district}
            disabled={loading}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="">Select District</option>

            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-700 text-sm">
            ⚠ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            loading
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Fetching Live Weather...
            </>
          ) : (
            <>
              ⚡ Predict Power Outage Risk
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;