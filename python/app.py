import time
import hashlib
import json

import redis
from flask import Flask, request, abort

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

@app.route('/')
def hello():
    return 'Hello, Paxos!', 200


@app.route('/messages', methods = ['POST'])
def encode_message():
    resonse = {}
    try:
        json_data  = request.get_json()
        message  = json_data['message']
        print("message: %s" % message)
        data_hash = hashlib.sha256(bytes(message, 'utf-8')).hexdigest();
        cache.set(data_hash, message)
        response = { "digest": data_hash}
        return json.dumps(response), 201

    except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)
    except Exception as exc:
        response = {"error": "service is temporarily unavailable"}
        return json.dumps(response), 503


@app.route('/messages/<hash>', methods = ['GET'])
def decode_message(hash):
    resonse = {}
    if len(hash) == 0:
        return "Please provide a valid hash"
    try:
        message = cache.get(hash)
        if message:
            response = { "message": message.decode("utf-8") }
            return json.dumps(response), 200
        else:
            response = { "error": "message not found"}
            return json.dumps(response), 404

    except redis.exceptions.ConnectionError as exc:
        if retries == 0:
            raise exc
        retries -= 1
        time.sleep(0.5)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
