from urllib2 import Request, urlopen, URLError 
import json
import time ## Import 'time' library. Allows us to use 'sleep'
import RPi.GPIO as GPIO ## Import GPIO library
GPIO.setmode(GPIO.BOARD) ## Use board pin numbering
GPIO.setup(7, GPIO.OUT) ## Setup GPIO Pin 7 to OUT

# Let's create a Bridge, yiha!!
previousStatus = 'closed'
while True:
	#Make the API call
	request = Request('http://donjonkeeper.herokuapp.com/GET/currentstatus')
	
	try:
		response = urlopen(request)
		j = json.loads(response.read())
		currentstatus = j[0]
		status = currentstatus['status']	
		if status == 'open':
			if previousStatus =='closed': ## Status has changed from Closed to Open
			    GPIO.output(7,true) ## Turn on GPIO pin 7
				time.sleep(0.5)
				GPIO.output(7,false) ## Turn off GPIO pin 7
			previousStatus = 'open'
			#print 'yiha'
		else:
		    if previousStatus == 'open':
			    GPIO.output(7,true) ## Turn on GPIO pin 7
				time.sleep(0.5)
				GPIO.output(7,false) ## Turn off GPIO pin 7
			previousStatus = 'closed'
			#print 'bouhou'
	except URLError, e:
		print 'Sa mere, ca foire!', e
	time.sleep(1)
	