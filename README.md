# FlyByLoad

Code for the platform to measure, show and evaluate vital signals. 
The folder SampleData has 3 examples of measurement for the EMG sensor.

## Measurement ##

This part is simulating a server generating random numbers to be plotted.
To run the code:

```
python3 runserver.py
```

A simple page with the random number will be shown using Flask. The other 2 values are calculated using the initial random value multiplied by 100 and 30. This version does not include Vue.js, it's only generating the numbers.
The server + page will run on:

*http://127.0.0.1:5000*

The MongoDB part should be developed together with the back-end in next steps.

The boxes will be highlighted accordingly to random values, in the same way as the risk indicator at the bottom of the page.

![Screenshot](/Assets/Screenshot.png)

## Visualization ##

To run the Vue app version:
```
npm run serve
```

The app will run on:

*http://localhost:8080/*

And will take the data from runserver.py to illustrate the fictious data.


