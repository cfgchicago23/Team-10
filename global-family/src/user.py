# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
# db = SQLAlchemy(app)

# # Association table for many-to-many relationship between User and Club
# user_clubs = db.Table('user_clubs',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#     db.Column('club_id', db.Integer, db.ForeignKey('club.id'))
# )

# # Club model
# class Club(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), unique=True, nullable=False)
#     users = db.relationship('User', secondary=user_clubs)

# # User model
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     joined_clubs = db.Column(db.String(500))
#     clubs = db.relationship('Club', secondary=user_clubs)

# # Route to register a new user
# @app.route('/api/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     username = data['username']
#     user = User(username=username)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"message": "User registered successfully."})

# # Route to let a user join a club
# @app.route('/api/join_club', methods=['POST'])
# def join_club():
#     data = request.get_json()
#     user_id = data['user_id']
#     club_id = data['club_id']
#     user = User.query.get(user_id)
#     if user:
#         if user.joined_clubs:
#             user.joined_clubs += f",{club_id}"
#         else:
#             user.joined_clubs = str(club_id)
#         db.session.commit()
#         return jsonify({"message": "Club joined successfully."})
#     return jsonify({"error": "User not found."})

# # Route to get clubs a user has joined
# @app.route('/api/joined_clubs/<int:user_id>', methods=['GET'])
# def get_joined_clubs(user_id):
#     user = User.query.get(user_id)
#     if user and user.joined_clubs:
#         club_ids = user.joined_clubs.split(',')
#         # Here, you'd typically fetch the club details from the Club model using these IDs
#         return jsonify({"joined_clubs": club_ids})
#     return jsonify({"error": "User not found or no clubs joined."})

# @app.route('/api/clubs', methods=['GET'])
# def get_all_clubs():
#     clubs = Club.query.all()
#     return jsonify([club.name for club in clubs])

# @app.route('/api/clubs', methods=['GET'])
# def get_all_clubs():
#     clubs = Club.query.all()
#     return jsonify([{"id": club.id, "name": club.name} for club in clubs])

# if __name__ == '__main__':
#     db.create_all()
#     app.run(debug=True)
