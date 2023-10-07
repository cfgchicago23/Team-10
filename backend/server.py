import json

from bson import UuidRepresentation
from flask import Flask, jsonify, request
from pymongo import MongoClient
import bcrypt
import uuid
from dotenv import dotenv_values
from flask_cors import CORS, cross_origin

# load .env variables
config = dotenv_values("./database/.env")

global SIGNED_IN_USER

app = Flask(__name__)
CORS(app)

# set up connection to mongo db server
db_client = MongoClient('0.0.0.0',
                        27017,
                        username='team10',
                        password='team10',
                        uuidRepresentation='standard')
db = db_client['flask_db']

# set up mongodb collections
user_accounts = db["user_accounts"]
clubs = db["clubs"]


@app.route('/api/clubs/list', methods=['GET'])
def get_clubs():
    try:
        # fetch the clubs
        club_documents = SIGNED_IN_USER['clubs']

        # populate the JSON response
        list_response = []
        for club_document in club_documents:
            list_response += {"id": club_document['club_id'],
                              "name": club_document['name'],
                              "description": club_document['description']}
        return jsonify(list_response), 200

    except Exception as e:
        return f"error message: \n{e}", 400


@app.route('/api/clubs/addmember', methods=['POST'])
def add_member_to_club():
    try:
        # parse JSON
        data = request.get_json()
        club_name = data['club_name']
        user_email = data['user_email']

        # validate that club exists
        club_document = clubs.find_one({'name': club_name})
        if club_document is None:
            return jsonify({"error": "Club does not exist."}), 400

        # validate that user exists
        user_document = user_accounts.find_one({'email': user_email})
        if user_document is None:
            return jsonify({"error": "User does not exist."}), 400

        # add user as club member
        club_document['club_members'] += user_document

        # add club to user's club list
        user_document['clubs'] += club_document

        return '', 200

    except Exception as e:
        return f"error message: \n{e}", 400


@app.route('/api/clubs/join', methods=['POST'])
def request_to_join_club():
    try:
        data = request.get_json()

        # validate that the signed in user is a student
        if (SIGNED_IN_USER is not None) & (SIGNED_IN_USER['type'] == 'club_leader'):
            return jsonify({"error": "User must be a student."}, 400)

        club_name = data['club_name']

        # validate that club exists
        club_document = clubs.find_one({'name': club_name})
        if club_document is None:
            return jsonify({"error": "Club does not exist."}), 400

        # add user as a pending member to club
        club_document['pending_members'] += SIGNED_IN_USER

        return '', 200

    except Exception as e:
        return f"error message: \n{e}", 400


# API route for adding a new club
@app.route('/api/clubs/add', methods=['POST'])
def add_club():
    try:
        club_data = request.get_json()
        if (SIGNED_IN_USER is not None) & (SIGNED_IN_USER['type'] == 'student'):
            return jsonify({"error": "User must be a club leader."}, 400)

        # parse json
        club_name = club_data['name']
        club_description = club_data['description']
        club_country = club_data['country']

        # generate UUID for club
        club_id = uuid.uuid4()

        club_mentor_id = SIGNED_IN_USER['_id']
        club_members = []
        club_pending_members = []

        # create document and insert into collection
        club_document = {
            "club_id": club_id.hex,
            "mentor_id": club_mentor_id.hex,
            "name": club_name,
            "description": club_description,
            "members": club_members,
            "pending_members": club_pending_members,
            "country": club_country
        }

        # validate that it is not a duplicate club
        if clubs.find_one({'name': club_name}) is not None:
            return jsonify({"error": "This club already exists"}), 400

        clubs.insert_one(club_document)

        return '', 200
    except Exception as e:
        return f"error message: \n{e}", 400


@app.route("/api/signup", methods=["POST"])
def signup():
    """
    Registers a new user to the system
    :return: 200 if user successfully added, 400 otherwise
    """
    try:
        user_data = request.get_json()

        # parse JSON data
        user_email = user_data["email"]
        user_password = user_data["password"]
        user_type = user_data["type"]
        user_name = user_data["name"]
        user_country = user_data['country']

        # generate UUID for user id
        user_id = uuid.uuid4()

        # generate hashed (+salted) password
        hashed_password = bcrypt.hashpw(user_password.encode('utf8'), bcrypt.gensalt())

        # create document and insert into collection
        user_document = {
            "_id": user_id.hex,
            "name": user_name,
            "email": user_email,
            "password": hashed_password,
            "type": user_type,
            "country": user_country,
            "clubs": [],
            "percent_tracker": {}
        }

        # validate that it is not a duplicate email
        if user_accounts.find_one({'email': user_email}) is not None:
            return jsonify({"error": "you can only have one account per email"}), 400

        user_accounts.insert_one(user_document)

        return jsonify(''), 200
    except Exception as e:
        return f"error message: \n{e}", 400


@app.route("/api/signout", methods=["GET"])
def signout():
    try:

        # set global variable to none
        global SIGNED_IN_USER
        SIGNED_IN_USER = None

    except Exception as e:
        return f"error message: \n{e}", 400


@app.route("/api/login", methods=["POST"])

def login():
    try:
        user_data = request.get_json()

        # parse JSON
        user_email = user_data['email']
        user_password = user_data['password']
        user_document = user_accounts.find_one({'email': user_email})

        # validate that the user exists
        if user_document is None:
            return jsonify({'error': 'The user account with this email does not exist!'}), 400

        # validate the password
        check_password = bcrypt.checkpw(user_password.encode('utf-8'), user_document['password'])
        if check_password is True:
            global SIGNED_IN_USER
            SIGNED_IN_USER = user_document
            return '', 200
        else:
            return jsonify({'error': 'Invalid password'}), 200

    except Exception as e:
        return f"error message: \n{e}", 400


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
