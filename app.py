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




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)