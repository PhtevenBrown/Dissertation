import serial
import time
import requests


def init():
	global SER
	APN = "internet"

	# documentation says use port ttyAMA0, use ttyS0
	SER = serial.Serial("/dev/ttyS0", 115200)
	SER.flushInput()
	SER.flushOutput()
	SER.timeout = 5

	# GPS Setup
	issue("AT+CGPSPWR=1", False)
	issue("AT+CGPSRST=0", False)

	# HTTPS Setup
	issue("AT+HTTPINIT", False)
	issue("AT+HTTPSSL=1", False)
	issue("AT+HTTPPARA=CID,1", False)

	# GPRS Setup
	issue("AT+SAPBR=3,1,Contype,GPRS", False)
	issue("AT+SAPBR=3,1,APN," + APN, False)
	issue("AT+SAPBR=1,1", False)
	while issue("AT+SAPBR=2,1", True) == "+SAPBR: 1,3,\"0.0.0.0\"\r\n":
		time.sleep(1)


def issue(command, parse):
	SER.write(command + "\n")
	output = []
	while parse:
		str = SER.readline()  # read a line of data from the serial port
		if str == "OK\r\n" or str == "OK":
			return output[1]
		output.append(str)

	SER.readline()
	SER.readline()


def getCoordinates():
	while findMissingDroids():
		coordinates = issue("AT+CGPSINF=2", True).split(",")
		broadcast(coordinates)


def findMissingDroids():
	while issue("AT+CGPSSTATUS?", True) != "+CGPSSTATUS: Location 3D Fix\r\n":
		time.sleep(0.5)
	return True


def broadcast(coordinates):
	userID = "jefB6Mceb@nXNP8G"
	url = "devweb2019.cis.strath.ac.uk/~xxx11111/gps/php/relay.php?lat="+ coordinates[2] + "&lon=" + coordinates[4] + "&id=" + userID
	issue("AT+HTTPPARA=URL,"+url, False)
	issue("AT+HTTPACTION=0", False)
	# Send data by WiFi instead
	# payload = {'lat': coordinates[2], 'lon': coordinates[4], 'id': userID}
	# requests.get('https://devweb2019.cis.strath.ac.uk/~xxx11111/gps/php/relay.php', payload)


init()
getCoordinates()
