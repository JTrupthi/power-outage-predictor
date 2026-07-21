import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

# Karnataka District -> Representative City
DISTRICT_TO_CITY = {
    "Bagalkot": "Bagalkot",
    "Ballari": "Ballari",
    "Belagavi": "Belagavi",
    "Bengaluru Urban": "Bengaluru",
    "Bengaluru Rural": "Devanahalli",
    "Bidar": "Bidar",
    "Chamarajanagar": "Chamarajanagar",
    "Chikkaballapur": "Chikkaballapur",
    "Chikkamagaluru": "Chikkamagaluru",
    "Chitradurga": "Chitradurga",
    "Dakshina Kannada": "Mangaluru",
    "Davanagere": "Davanagere",
    "Dharwad": "Hubballi",
    "Gadag": "Gadag",
    "Hassan": "Hassan",
    "Haveri": "Haveri",
    "Kalaburagi": "Kalaburagi",
    "Kodagu": "Madikeri",
    "Kolar": "Kolar",
    "Koppal": "Koppal",
    "Mandya": "Mandya",
    "Mysuru": "Mysuru",
    "Raichur": "Raichur",
    "Ramanagara": "Ramanagara",
    "Shivamogga": "Shivamogga",
    "Tumakuru": "Tumakuru",
    "Udupi": "Udupi",
    "Uttara Kannada": "Karwar",
    "Vijayapura": "Vijayapura",
    "Vijayanagara": "Hosapete",
    "Yadgir": "Yadgir",
}


def get_weather(district):
    city = DISTRICT_TO_CITY.get(district, district)

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city},Karnataka,IN"
        f"&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        print(response.json())
        return None

    data = response.json()

    rainfall = 0
    if "rain" in data:
        rainfall = data["rain"].get("1h", 0)

    lightning = (
        1
        if data["weather"][0]["main"].lower() == "thunderstorm"
        else 0
    )

    return {
        "city": district,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "rainfall": rainfall,
        "lightning": lightning,
        "description": data["weather"][0]["description"],
    }


def get_forecast(district):
    city = DISTRICT_TO_CITY.get(district, district)

    url = (
        f"https://api.openweathermap.org/data/2.5/forecast"
        f"?q={city},Karnataka,IN"
        f"&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return []

    data = response.json()

    forecast = []

    for item in data["list"][::8][:5]:
        forecast.append(
            {
                "date": item["dt_txt"].split(" ")[0],
                "temp": round(item["main"]["temp"]),
                "humidity": item["main"]["humidity"],
                "description": item["weather"][0]["description"],
            }
        )

    return forecast