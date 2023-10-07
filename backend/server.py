from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/content", methods=["GET"])
def content():

if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")


