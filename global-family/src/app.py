from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Replace with your database URI
db = SQLAlchemy(app)

# Define Club and Event models
class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    mentor_id = db.Column(db.Integer, nullable=False)
    # Add other club-related fields here

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    club_id = db.Column(db.Integer, nullable=False)
    # Add other event-related fields here

# API route for adding a new club
@app.route('/api/clubs/add', methods=['POST'])
def add_club():
    data = request.get_json()
    club = Club(
        name=data['name'],
        description=data['description'],
        mentor_id=data['mentor_id']
        # Add other club-related data here
    )
    db.session.add(club)
    db.session.commit()
    return jsonify({"message": "Club added successfully."})

# API routes for clubs
@app.route('/api/clubs', methods=['GET'])
def get_clubs():
    clubs = Club.query.all()
    club_list = [{"id": club.id, "name": club.name, "description": club.description} for club in clubs]
    return jsonify(club_list)

@app.route('/api/clubs/<int:club_id>', methods=['GET'])
def get_club(club_id):
    club = Club.query.get_or_404(club_id)
    club_data = {
        "id": club.id,
        "name": club.name,
        "description": club.description,
        "mentor_id": club.mentor_id
        # Add other club-related data here
    }
    return jsonify(club_data)

@app.route('/api/clubs', methods=['POST'])
def create_club():
    data = request.get_json()
    new_club = Club(
        name=data['name'],
        description=data['description'],
        # ... other fields ...
    )
    db.session.add(new_club)
    db.session.commit()
    return jsonify({"message": "Club created successfully.", "club": data})

@app.route('/api/clubs/<int:club_id>', methods=['DELETE'])
def delete_club(club_id):
    print(f"Attempting to delete club with ID: {club_id}")
    club = Club.query.get_or_404(club_id)
    db.session.delete(club)
    db.session.commit()
    return jsonify({"message": "Club deleted successfully."})

# API routes for events (similar structure as clubs)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)