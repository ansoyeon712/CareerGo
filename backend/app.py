from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "CareerGo backend is running"

@app.route("/api/career")
def get_career():
    career_data = [
        {
            "period": "2024",
            "description": "Hiwi in Digital Literacy Programming Kurse, mit R" 

        }
    ]
    

    return jsonify(career_data)


@app.route("/api/education")
def get_education():
    education_data = [
        {
            "school": "Rostock University",
            "degree": "B.sc. Informatik",
            "period": "2026 -",
            "description": "Ich studiere Informatik mit Schwerpunkt auf Softwareentwicklung und möchte meine Kenntnisse in der Praxis weiter vertiefen."
        }
    ]

    return jsonify(education_data)


@app.route("/api/media")
def get_media():
    media_data = [
        {
            "title": "My Github",
            "organization": "Die Web-app CareerGo",
            "period": "2026",
            "description": "Entwicklung einer 3-Tier-Webanwendung mit Frontend, Backend und Datenbank zur Erstellung von Lebensläufen sowie zur Auswertung von Seitenaufrufen und Nutzerinteraktionen.",
            "link": "https://example.com"
        }
    ]

    return jsonify(media_data)

   

if __name__ == "__main__":
    app.run(debug=True, port=5001)