import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from mailjet_rest import Client
import os

mailjet = Client(auth=("961275c9f4d016941bd768ee70e25963", "083749939b1a791d16712100c0073d3b"), version='v3.1')



def writeData(name: str, data):
    json_object = json.dumps(data, indent=4)
    with open("./data/" + name + ".json", "w+") as outfile:
        outfile.write(json_object)

def readData(name:str, data):
    with open("./data/" + name + ".json", 'r') as openfile:
        # print(openfile)
        return json.load(openfile)

def prepareMail(to: str, link: str):
    return {
            'Messages': [
                {
                "From": {
                    "Email": "no-reply-easysafe@email.com",
                    "Name": "EasySafe"
                },
                "To": [
                    {
                    "Email": to,
                    "Name": "You"
                    }
                ],
                "Subject": "EasySafe",
                "TextPart": "You have been invited to create an EasySafe\n" + link ,
                "HTMLPart": "You have been invited to create an EasySafe\n" + link
                }
            ]
        }

def sendMail(data):
    result = mailjet.send.create(data=data)
    print(result.status_code)
    print(result)

    

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
    for user in request.get_json()["users"]: 
        sendMail(prepareMail(user["email"], "http://127.0.0.1:3000/safe/" + str(len(safes) - 1)))

    return 'Ok', 200

@app.route('/editSafe', methods=['POST'])
def editSafe():
    id = request.args.get('id')
    safes[int(id)] = request.get_json()
    writeData("safes", safes)
    return '', 204

app.run(host="0.0.0.0", port=37000)