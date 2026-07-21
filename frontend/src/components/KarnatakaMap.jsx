import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function KarnatakaMap({ prediction, district }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/data/karnataka_districts.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error(err));
  }, []);

  const bounds = [
    [11.4, 73.8],
    [18.8, 78.7],
  ];

  const getColor = (risk) => {
    switch (risk) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#facc15";
      case "Low":
        return "#22c55e";
      default:
        return "#d1d5db";
    }
  };

  const normalize = (name = "") => {
    const value = name.toLowerCase().trim();

    const aliases = {
      belagavi: "belgaum",
      belgaum: "belgaum",

      ballari: "bellary",
      bellary: "bellary",

      kalaburagi: "gulbarga",
      gulbarga: "gulbarga",

      bengaluru: "bangalore",
      "bengaluru urban": "bangalore urban",
      "bangalore urban": "bangalore urban",

      "bengaluru rural": "bangalore rural",
      "bangalore rural": "bangalore rural",

      mysuru: "mysore",
      mysore: "mysore",

      shivamogga: "shimoga",
      shimoga: "shimoga",

      vijayapura: "bijapur",
      bijapur: "bijapur",

      chikkamagaluru: "chikmagalur",
      chikmagalur: "chikmagalur",

      chikkaballapura: "chikballapur",
      chikballapur: "chikballapur",

      chamarajanagara: "chamrajnagar",
      chamrajnagar: "chamrajnagar",
    };

    return aliases[value] || value;
  };

  const styleFeature = (feature) => {
    const geoDistrict = normalize(feature.properties.NAME_2);
    const selectedDistrict = normalize(district);

    const selected = geoDistrict === selectedDistrict;

    return {
      fillColor: selected ? getColor(prediction) : "#f3f4f6",
      fillOpacity: selected ? 0.85 : 0.45,
      color: selected ? "#1d4ed8" : "#94a3b8",
      weight: selected ? 3 : 1,
      dashArray: selected ? "" : "3",
    };
  };

  const onEachFeature = (feature, layer) => {
    const districtName = feature.properties.NAME_2;

    const selected =
      normalize(districtName) === normalize(district);

    const riskColor =
      prediction === "High"
        ? "#ef4444"
        : prediction === "Medium"
        ? "#eab308"
        : "#16a34a";

    layer.bindPopup(`
      <div style="min-width:180px;font-family:Arial;padding:4px">
        <h3 style="margin-bottom:8px;color:#2563eb;">
          📍 ${districtName}
        </h3>

        <p style="margin:6px 0;">
          <strong>Status:</strong>
        </p>

        ${
          selected
            ? `<p style="font-weight:bold;color:${riskColor};font-size:15px">
                 ${prediction.toUpperCase()} RISK
               </p>
               <p style="color:#16a34a;margin-top:8px;">
                 ✔ Selected District
               </p>`
            : `<p style="color:#6b7280">
                 Not Predicted
               </p>`
        }
      </div>
    `);

    layer.on({
      mouseover(e) {
        e.target.setStyle({
          weight: 4,
          fillOpacity: 1,
        });

        e.target.bringToFront();
      },

      mouseout(e) {
        e.target.setStyle(styleFeature(feature));
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            🗺️ Karnataka District Risk Map
          </h2>

          <p className="text-gray-500 mt-2">
            Live visualization of predicted outage risk across Karnataka districts.
          </p>
        </div>

        <div className="bg-gray-50 border rounded-xl px-5 py-3 flex gap-6 text-sm font-medium shadow-sm">

          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: "#22c55e" }}
            ></div>
            Low
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: "#facc15" }}
            ></div>
            Medium
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: "#ef4444" }}
            ></div>
            High
          </div>

        </div>

      </div>

      {!geoData ? (
        <div className="h-[700px] flex items-center justify-center bg-gray-50 rounded-2xl">

          <div className="text-center">

            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-5 text-gray-500">
              Loading Karnataka Map...
            </p>

          </div>

        </div>
      ) : (
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [20, 20] }}
          zoomControl={true}
          style={{
            height: "700px",
            width: "100%",
            borderRadius: "18px",
          }}
        >
          <TileLayer
            attribution="© OpenStreetMap © CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <GeoJSON
            key={`${district}-${prediction}`}
            data={geoData}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      )}

      <div className="mt-5 text-center text-gray-500 text-sm">
        Hover over a district to highlight it. Click on a district to view its prediction status.
      </div>

    </div>
  );
}

export default KarnatakaMap;