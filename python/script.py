from urllib2 import Request, urlopen, URLError 
import json
import time ## Import 'time' library. Allows us to use 'sleep'
import RPi.GPIO as GPIO ## Import GPIO library
GPIO.setmode(GPIO.BOARD) ## Use board pin numbering
GPIO.setup(12, GPIO.OUT) ## Setup GPIO Pin 5 to OUT

GPIO.output(12,True)
#print "getting started"
## Let's create a Bridge, yiha!!
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
			    #print 'opening door'
			    GPIO.output(12,False) ## Turn off GPIO pin 7
			    time.sleep(2)
			    GPIO.output(12,True) ## Turn on GPIO pin 7
			previousStatus = 'open'
			#print 'yiha'
		else:
		    if previousStatus == 'open':
                            #print 'closing door'
			    GPIO.output(12,False) ## Turn off GPIO pin 7
			    time.sleep(2)
			    GPIO.output(12,True) ## Turn back on GPIO pin 7
		    previousStatus = 'closed'
		    #print 'bouhou'
	except URLError, e:
		print 'Sa mere, ca foire!', e
	time.sleep(1)
	
