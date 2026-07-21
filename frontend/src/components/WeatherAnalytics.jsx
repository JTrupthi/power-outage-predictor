import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function WeatherAnalytics({ weather }) {
  if (!weather) return null;

  const data = [
    { name: "Temp", value: weather.temperature },
    { name: "Humidity", value: weather.humidity },
    { name: "Wind", value: weather.wind_speed },
    { name: "Rain", value: weather.rainfall },
  ];

  const metrics = [
    {
      title: "Temperature",
      value: `${weather.temperature}°C`,
      icon: "🌡️",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      title: "Humidity",
      value: `${weather.humidity}%`,
      icon: "💧",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      title: "Wind Speed",
      value: `${weather.wind_speed} km/h`,
      icon: "🌬️",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      title: "Rainfall",
      value: `${weather.rainfall} mm`,
      icon: "🌧️",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📊 Weather Analytics
      </h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className={`${metric.bg} ${metric.border} border rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="text-4xl">{metric.icon}</div>

            <p className="text-gray-600 mt-3">{metric.title}</p>

            <p className="text-2xl font-bold mt-2">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-5">
            📈 Weather Trend
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-5">
            📊 Metric Comparison
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WeatherAnalytics;