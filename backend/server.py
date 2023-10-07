import json

from bson import UuidRepresentation
from flask import Flask, jsonify, request
from pymongo import MongoClient
import bcrypt
import uuid
from dotenv import dotenv_values

# load .env variables
config = dotenv_values("./database/.env")

app = Flask(__name__)

# set up connection to mongo db server
db_client = MongoClient('localhost',
                        27017,
                        username=config['MONGO_USERNAME'],
                        password=config['MONGO_PASSWORD'],
                        uuidRepresentation='standard')
db = db_client['flask_db']


# set up mongodb collections
user_accounts = db["user_accounts"]
clubs = db["clubs"]


@app.route("/signup", methods=["POST"])
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

        # generate UUID for user id
        user_id = uuid.uuid4()

        # generate hashed (+salted) password
        hashed_password = bcrypt.hashpw(user_password.encode('utf8'), bcrypt.gensalt())

        # create document and insert into collection
        user_document = {
            "_id": user_id.hex,
            "email": user_email,
            "password": hashed_password,
            "type": user_type,
            "club": []
        }

        # validate that it is not a duplicate email
        if user_accounts.find_one({'email': user_email}) is not None:
            return jsonify({"error": "you can only have one account per email"}), 400

        user_accounts.insert_one(user_document)

        return jsonify(''), 200
    except Exception as e:
        return f"error message: \n{e}", 400


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
