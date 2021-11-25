
# Start with a basic flask app webpage.
from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context,  jsonify,request
from random import random
from time import sleep
from threading import Thread, Event
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime


__author__ = 'slynn'

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True
app.static_folder = 'static'


CORS(app)

#turn the flask app into a socketio app
socketio = SocketIO(app, async_mode=None, logger=True, engineio_logger=True)

#random number Generator Thread
thread = Thread()
thread_stop_event = Event()


client = MongoClient('localhost:27017')
db = client["sensor"]
coll = db["values"]

def randomNumberGenerator():
    """
    Generate a random number every 1 second and emit to a socketio instance (broadcast)
    Ideally to be run in a separate thread?
    """
    #infinite loop of magical random numbers
    print("Making random numbers")
    while not thread_stop_event.isSet():
        number = round(random(),3)           
       
        socketio.emit('newnumber', {'number': number}, namespace='/test')
        now = datetime.now()

        current_time = now.strftime("%d/%m/%Y %H:%M:%S")

        mydict = { "value": number, "date": current_time}
        x = coll.insert_one(mydict)
        print(x.inserted_id)
        print (db.coll.find())     
       
        socketio.sleep(2)
        

@app.route('/emmiter')
def newnumber():
    #only by sending this page first will the client be connected to the socketio instance
    number = round(random(),3)     
    now = datetime.now()

    current_time = now.strftime("%d/%m/%Y %H:%M:%S")

    mydict = { "value": number, "date": current_time}
    x = coll.insert_one(mydict)
    return str(number)

@app.route('/')
def index():
    #only by sending this page first will the client be connected to the socketio instance
    return render_template('index.html')

  
@socketio.on('connect', namespace='/test')
def test_connect():
    # need visibility of the global thread object
    global thread
    print('Client connected')

    #Start the random number generator thread only if the thread has not been started before.
    if not thread.isAlive():
        print("Starting Thread")
        thread = socketio.start_background_task(randomNumberGenerator)
      

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app)
