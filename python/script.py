from urllib2 import Request, urlopen, URLError 
import json
import time ## Import 'time' library. Allows us to use 'sleep'
import RPi.GPIO as GPIO ## Import GPIO library
GPIO.setmode(GPIO.BOARD) ## Use board pin numbering
GPIO.setup(7, GPIO.OUT) ## Setup GPIO Pin 7 to OUT

# Let's create a Bridge, yiha!!
while True:
	#Make the API call
	request = Request('http://donjonkeeper.herokuapp.com/GET/currentstatus')

	try:
		response = urlopen(request)
		j = json.loads(response.read())
		currentstatus = j[0]
		status = currentstatus['status']	
		if status == 'open':
			GPIO.output(7,true) ## Turn on GPIO pin 7
			#print 'yiha'
		else:
			GPIO.output(7,false) ## Turn on GPIO pin 7
			#print 'bouhou'
	except URLError, e:
		print 'No kittez. Got an error code:', e
	time.sleep(1)
