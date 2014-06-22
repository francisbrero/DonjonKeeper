from urllib2 import Request, urlopen, URLError 
import json
import time ## Import 'time' library. Allows us to use 'sleep'
import RPi.GPIO as GPIO ## Import GPIO library
GPIO.setmode(GPIO.BOARD) ## Use board pin numbering
GPIO.setup(12, GPIO.OUT) ## Setup GPIO Pin 5 to OUT

GPIO.output(12,False)
time.sleep(5)
GPIO.output(12,True)
time.sleep(5)
GPIO.output(12,False)
