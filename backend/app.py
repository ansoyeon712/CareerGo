from flask import Flask, jsonify, request
from flask_cors import CORS

from database import init_db, get_profile, save_profile

app = Flask(__name__)
CORS(app)

init_db()


@app.route("/")
def home():
    return "CareerGo backend is running"


@app.route("/api/profile", methods=["GET"])
def get_profile_api():
    profile = get_profile()
    return jsonify(profile)


@app.route("/api/profile", methods=["POST"])
def save_profile_api():
    profile_data = request.get_json()
    save_profile(profile_data)

    return jsonify({
        "message": "Profile saved successfully",
        "profile": get_profile()
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)