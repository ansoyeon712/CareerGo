import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "careergo.db"


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            name TEXT NOT NULL DEFAULT '',
            headline TEXT NOT NULL DEFAULT '',
            about TEXT NOT NULL DEFAULT '',
            career_json TEXT NOT NULL DEFAULT '[]'
        )
        """
    )

    connection.execute(
        """
        INSERT OR IGNORE INTO profile (
            id,
            name,
            headline,
            about,
            career_json
        )
        VALUES (1, '', '', '', '[]')
        """
    )

    connection.commit()
    connection.close()


def get_profile():
    connection = get_connection()

    row = connection.execute(
        """
        SELECT name, headline, about, career_json
        FROM profile
        WHERE id = 1
        """
    ).fetchone()

    connection.close()

    return {
        "name": row["name"],
        "headline": row["headline"],
        "about": row["about"],
        "careerItems": json.loads(row["career_json"]),
    }


def save_profile(profile_data):
    name = profile_data.get("name", "")
    headline = profile_data.get("headline", "")
    about = profile_data.get("about", "")
    career_items = profile_data.get("careerItems", [])

    connection = get_connection()

    connection.execute(
        """
        UPDATE profile
        SET name = ?,
            headline = ?,
            about = ?,
            career_json = ?
        WHERE id = 1
        """,
        (
            name,
            headline,
            about,
            json.dumps(career_items),
        ),
    )

    connection.commit()
    connection.close()