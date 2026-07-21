import pandas as pd
import random

districts = [
    "Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Mangaluru",
    "Shivamogga", "Udupi", "Belagavi", "Ballari",
    "Tumakuru", "Hassan", "Dharwad", "Vijayapura",
    "Raichur", "Bidar", "Kalaburagi", "Chikkamagaluru",
    "Kodagu", "Kolar", "Mandya", "Chitradurga",
    "Haveri", "Gadag", "Bagalkot", "Yadgir",
    "Ramanagara", "Chamarajanagar", "Davanagere",
    "Koppal", "Uttara Kannada", "Vijayanagara", "Chikkaballapur"
]

data = []

for _ in range(3000):

    district = random.choice(districts)

    rainfall = round(random.uniform(0, 350), 2)
    humidity = random.randint(30, 100)
    wind_speed = round(random.uniform(0, 60), 2)
    temperature = round(random.uniform(18, 42), 2)
    lightning = random.randint(0, 25)

    score = 0

    if rainfall > 220:
        score += 2
    elif rainfall > 120:
        score += 1

    if humidity > 80:
        score += 1

    if wind_speed > 35:
        score += 2
    elif wind_speed > 20:
        score += 1

    if lightning > 12:
        score += 2
    elif lightning > 5:
        score += 1

    if score >= 6:
        risk = "High"
    elif score >= 3:
        risk = "Medium"
    else:
        risk = "Low"

    data.append([
        district,
        rainfall,
        humidity,
        wind_speed,
        temperature,
        lightning,
        risk
    ])

df = pd.DataFrame(
    data,
    columns=[
        "district",
        "rainfall",
        "humidity",
        "wind_speed",
        "temperature",
        "lightning",
        "risk"
    ]
)

df.to_csv("weather_data.csv", index=False)

print("Dataset generated successfully!")
print(df.head())