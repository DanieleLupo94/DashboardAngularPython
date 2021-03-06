from flask import Flask, request, jsonify, send_file, make_response
import datetime
import os 
import time
import json

app = Flask(__name__)

@app.route("/turnOn")
def turnOn():
	os.system("python3 ./controllerTuya.py EUheu1592047867994rwfxKGqBr1eTvr9 EUheu1592047867994rwfxKHdzG8hJ3Oh 44152035483fda90cb1e on")
	return json_response({"message": "Luce accesa"})

@app.route("/turnOff")
def tutnOff():
	os.system("python3 ./controllerTuya.py EUheu1592047867994rwfxKGqBr1eTvr9 EUheu1592047867994rwfxKHdzG8hJ3Oh 44152035483fda90cb1e off")
	return json_response({"message": "Luce spenta"})

@app.route("/takePic/<numero>")
def takePic(numero = 0):
	now = datetime.datetime.now()
	filename = now.strftime("%Y%m%d%H%M%S")
	filename = "{}.png".format(filename)
	os.system("raspistill -w 1000 -h 1000 -t 2000 -n -dt -e png -o {}".format(filename))
	return send_file(filename, mimetype='image/gif'), 200, {'Access-Control-Allow-Origin': '*'}
	
@app.route("/takeVideo/<numero>")
def takeVideo(numero = 0):
	now = datetime.datetime.now()
	filename = now.strftime("%Y%m%d%H%M%S")
	video = "{}.h264".format(filename)
	filename = "{}.mp4".format(filename)
	os.system("raspivid -t 5000 -n -o {}".format(video))
	os.system("MP4Box -add {} -fps 30 {}".format(video, filename))
	return send_file(filename, mimetype='video/mp4'), 200, {'Access-Control-Allow-Origin': '*'}

def json_response(payload, status=200):
	return (json.dumps(payload), status, {'content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})

if __name__ == "__main__":
	app.run(host="0.0.0.0")