from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import bcrypt
import uuid

app = Flask(__name__)
db_client = MongoClient('localhost', 27017)
db = db_client.flask_db

# set up mongodb collections
user_accounts = db.user_accounts
clubs = db.clubs


@app.route("/signup", methods=["POST"])
@cross_origin
def signup():
    """
    Registers a new user to the system
    :return: 200 if user successfully added, 400 otherwise
    """
    user_data = request.get_json()

    # parse JSON data
    user_email = user_data["email"]
    user_password = user_data["password"]

    # generate UUID for user id
    user_id = uuid.uuid4()

    # generate hashed (+salted) password
    hashed_password = bcrypt.hashpw(user_password, bcrypt.gensalt())

    # create document and insert into collection
    user_document = {
        "id": user_id,
        "email": user_email,
        "password": hashed_password
    }

    # validate that it is not a duplicate email
    if user_accounts.find_one({'email': user_email}) is not None:
        return jsonify({"error": "you can only have one account per email"}), 400

    user_accounts.insert_one(user_document)
    return 200


@app.route("/content", methods=["GET"])
def content():

if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")


