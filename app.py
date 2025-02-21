from flask import Flask, send_from_directory, request, jsonify
import pandas as pd
from flask_cors import CORS
import os
import json
import bcrypt

app = Flask(__name__, static_folder=os.path.join(os.getcwd(), 'frontend', 'dist'))
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)