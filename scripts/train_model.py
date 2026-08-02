import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load the dataset
df = pd.read_csv("../dataset/weather_data.csv")

# Display the first 5 rows
print("First 5 Rows:")
print(df.head())

# Dataset Information
print("\nDataset Information:")
print(df.info())

# Dataset Shape
print("\nDataset Shape:")
print(df.shape)

# Missing Values
print("\nMissing Values:")
print(df.isnull().sum())

# Check Duplicate Records
print("\nDuplicate Records:")
print(df.duplicated().sum())

# Select Features (X) and Target (y)

X = df[[
    "rainfall",
    "humidity",
    "wind_speed",
    "temperature",
    "lightning"
]]

y = df["risk"]

print("\nFeatures:")
print(X.head())

print("\nTarget:")
print(y.head())

# Encode the target variable
label_encoder = LabelEncoder()

y = label_encoder.fit_transform(y)

print("\nEncoded Target:")
print(y[:10])

print("\nLabel Mapping:")
for index, label in enumerate(label_encoder.classes_):
    print(f"{label} -> {index}")

    # Split the dataset into training and testing sets

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\nTraining Data Shape:")
print(X_train.shape)

print("\nTesting Data Shape:")
print(X_test.shape)

# Train the Random Forest model

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

print("\n✅ Model training completed successfully!")

# Make predictions on the test data
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:")
print(f"{accuracy * 100:.2f}%")

# Display classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save the trained model
joblib.dump(model, "../model/power_outage_model.pkl")

# Save the label encoder
joblib.dump(label_encoder, "../model/label_encoder.pkl")

print("\n✅ Model saved successfully!")
print("📁 Model: model/power_outage_model.pkl")
print("📁 Label Encoder: model/label_encoder.pkl")