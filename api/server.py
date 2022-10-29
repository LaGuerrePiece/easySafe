import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin



def writeData(name: str, data):
    json_object = json.dumps(data, indent=4)
    with open("./data/" + name + ".json", "w+") as outfile:
        outfile.write(json_object)

def readData(name:str, data):
    with open("./data/" + name + ".json", 'r') as openfile:
        # print(openfile)
        return json.load(openfile)
 
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

safes = []
# safes = [
#     { 
#         'safeAddr': '0x00', 'numberOfSigns': 2, 'numberOfUsers': 3,
#         'users': [
#             {
#                 'email': 'aa@aaa.fr',
#                 'addr': '0x00'
#             }
#         ] 
#     }
# ]

# writeData("safes", safes)


safes = readData("safes", safes)



@app.route('/safes')
def get_safes():
    return jsonify(safes)


@app.route('/createSafe', methods=['POST'])
def add_safe():
    safes.append(request.get_json())
    writeData("safes", safes)
    return 'Ok', 200

@app.route('/editSafe', methods=['POST'])
def add_income():
    id = request.args.get('id')
    safes[id] = request.get_json()
    writeData("safes", safes)
    return '', 204


# @app.route('/')
# def index():
#     return jsonify(
#         {"message": "nothing to see here"}
#     )

# @app.route('/safes')
# def safes():
#     return jsonify(safes)


app.run(host="0.0.0.0", port=37000)