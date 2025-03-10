from flask import Flask, send_from_directory, request, jsonify
import pandas as pd
from flask_cors import CORS
import os
import json
import bcrypt

app = Flask(__name__, static_folder=os.path.join(os.getcwd(), 'frontend', 'dist'))
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

USERS_FILE = "users.json"
CONTACT_FILE = "contact_data.json"

# Ensure the contact JSON file exists
if not os.path.exists(CONTACT_FILE):
    with open(CONTACT_FILE, "w") as f:
        json.dump([], f)

try:
    govt_scholarships = pd.read_csv("indian_scholarships.csv")
    international_scholarships = pd.read_csv("international_scholarships.csv")
except FileNotFoundError:
    print("Error: CSV files not found. Ensure they are in the correct directory.")
    govt_scholarships = pd.DataFrame()
    international_scholarships = pd.DataFrame()

govt_scholarships.columns = govt_scholarships.columns.str.strip().str.lower()
international_scholarships.columns = international_scholarships.columns.str.strip().str.lower()

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)



@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request data"}), 400

        with open(CONTACT_FILE, "r") as f:
            existing_data = json.load(f)

        existing_data.append(data)

        with open(CONTACT_FILE, "w") as f:
            json.dump(existing_data, f, indent=4)

        return jsonify({"message": "Form submitted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/find_indian_scholarships', methods=['POST'])
def find_indian_scholarships():
    try:
        user_input = request.get_json()
        if not user_input:
            return jsonify({"error": "Invalid request data"}), 400

        filtered_df = govt_scholarships.copy()
        
        criteria_mapping = {
            "education": "education qualification",
            "gender": "gender",
            "community": "community",
            "religion": "religion",
            "isExServiceman": "exservice-men",
            "hasDisability": "disability",
            "hasSportsAchievements": "sports",
            "annualPercentage": "annual-percentage",
            "income": "income"
        }
        
        for key, column in criteria_mapping.items():
            if key in user_input and column in filtered_df.columns:
                value = user_input[key]
                if value:
                    if column in ["exservice-men", "disability", "sports"]:
                        value = "Yes" if value else "No"
                    filtered_df = filtered_df[filtered_df[column].astype(str).str.lower() == str(value).lower()]

        result = filtered_df[filtered_df['outcome'] == 1]['name'].tolist()
        return jsonify({'matching_scholarships': result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/find_international_scholarships', methods=['POST'])
def find_international_scholarships():
    try:
        user_input = request.get_json()
        if not user_input:
            return jsonify({"error": "Invalid request data"}), 400

        filtered_df = international_scholarships.copy()
        valid_columns = filtered_df.columns.str.lower()

        for key, value in user_input.items():
            key_lower = key.lower()
            if key_lower in valid_columns and value:
                filtered_df = filtered_df[filtered_df[key_lower].astype(str).str.contains(str(value), case=False, na=False)]

        if filtered_df.empty:
            return jsonify({'matching_scholarships': []})

        result = filtered_df.to_dict(orient='records')
        return jsonify({'matching_scholarships': result})


def get_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as file:
        return json.load(file)

def save_users(users):
    with open(USERS_FILE, "w") as file:
        json.dump(users, file, indent=2)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    users = get_users()

    if any(user["email"] == email for user in users):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    users.append({"name": name, "email": email, "password": hashed_password})
    save_users(users)

    return jsonify({"message": "User registered successfully"}), 201


    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
@app.route("/signin", methods=["POST"])
def signin():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    users = get_users()
    user = next((user for user in users if user["email"] == email), None)

    if not user:
        return jsonify({"message": "User not found"}), 400

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        return jsonify({"message": "Invalid password"}), 400

    return jsonify({"message": "Login successful", "user": {"name": user["name"], "email": user["email"]}}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
