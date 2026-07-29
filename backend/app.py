from flask import Flask, jsonify, request
from flask_cors import CORS

from database import init_db, get_profile, save_profile, get_skills, add_skill

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


@app.route("/api/skills", methods=["GET"])
def get_skills_api():
    skills = get_skills()
    return jsonify(skills)


@app.route("/api/skills", methods=["POST"])
def add_skill_api():
    skill_data = request.get_json()
    new_skill = add_skill(skill_data)

    return jsonify({
        "message": "Skill added successfully",
        "skill": new_skill
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)