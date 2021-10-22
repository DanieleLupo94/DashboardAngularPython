import requests
import pprint
import time
import sys

refresh_token = ''
access_token = ''
idLuce = ''
comando = ''

# Impostare userName e password
def getAccessToken():
	print("GET AUTH-TOKEN")
	auth = requests.post(
		"https://px1.tuyaus.com/homeassistant/auth.do",
		data={
			"userName": "dennyore@gmail.com",
			"password": "Sbagliata94",
			"countryCode": "44",
			"bizType": "smart_life",
			"from": "tuya",
		},
	).json()
	pprint.pprint(auth)
	global access_token
	global refresh_token
	access_token = auth["access_token"]
	refresh_token = auth["refresh_token"]
	
def getDevices():
	print("GET DEVICES")
	devices = requests.post(
    "https://px1.tuyaus.com/homeassistant/skill",
    json={"header": {"name": "Discovery", "namespace": "discovery", "payloadVersion": 1}, "payload": {"accessToken": access_token}}).json()
	pprint.pprint(devices)

def turnOn(deviceId):
	print("TURNING ON")
	turnon = requests.post(
    "https://px1.tuyaus.com/homeassistant/skill",
    json={"header": {"name": "turnOnOff", "namespace": "control", "payloadVersion": 1}, "payload": {"accessToken": access_token, "devId": deviceId, "value":"1"}}).json()
	pprint.pprint(turnon)
	
def turnOff(deviceId):
	print("TURNING OFF")
	turnoff = requests.post(
	"https://px1.tuyaus.com/homeassistant/skill",
	json={"header": {"name": "turnOnOff", "namespace": "control", "payloadVersion": 1}, "payload": {"accessToken": access_token, "devId": deviceId, "value":"0"}}).json()
	pprint.pprint(turnoff)

def refreshToken():
	global access_token
	global refresh_token
	if (access_token == '' or refresh_token == ''):
		return getAccessToken()
	auth = requests.post(
		"https://px1.tuyaus.com/homeassistant/access.do",
		data={
			"grant_type": "refresh_token",
			"refresh_token": refresh_token,
			"rand": 23
		},
	).json()
	pprint.pprint(auth)
	access_token = auth["access_token"]
	refresh_token = auth["refresh_token"]

def main():
	refreshToken()
	
	global idLuce
	global comando
	if comando == 'on':
		turnOn(idLuce)
	else:
		turnOff(idLuce)

if len(sys.argv) != 5:
	print("Uso: <accessToken> <refreshToken> <id> <on/off>")
	sys.exit(2)

argv = sys.argv
access_token
access_token = str(argv[1])

refresh_token
refresh_token = str(argv[2])

idLuce
idLuce = str(argv[3])

comando
comando = str(argv[4])

main()
