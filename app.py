from flask import Flask, render_template
from pathlib import Path
import sqlite3
import random;

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/game")
def game():
    conn = get_db_connection()
    cur = conn.cursor()
    rows = cur.execute(
        """
        SELECT cities.id, city, picture, regions.region_name, counties.county_name, coordinates, population, description FROM cities 
        INNER JOIN regions ON cities.region_id = regions.id
        INNER JOIN counties ON cities.county_id = counties.id
        INNER JOIN descriptions ON cities.description_id = descriptions.id;
        """
    ).fetchall()
    cities = [dict(row) for row in rows]
    conn.close()
    return render_template("game.html", cities = cities, id=random.randrange(0, 24))
    
@app.route("/correctGuess")
def correct():
    return render_template("correctGuess.html")

@app.route("/results")
def results():
    return render_template("results.html")

def get_db_connection():
    db = Path(__file__).parent / "cities.db"
    conn = sqlite3.connect(db)
    conn.row_factory = sqlite3.Row
    return conn


if __name__ == "__main__":
    app.run(debug="true")