<template>
  <div>
  
    <div id = "title">
      
      <h1>Fly-by-Load Panel</h1>
    </div>

    <div class="cards">

      <div class="card" id="heartrate">
      <h2 class="sensortitle"> Heart Rate<br>(BPM)</h2>        
      <h4 id="value1"> {{ msg }}</h4>
      </div>  
    
      <div class="card skinconduc">
        <h2 class="sensortitle">Skin Conductance<br>(µs)</h2>        
        <h4 id="value2"> {{ sensor2 }}</h4>
      </div> 
        
      <div class="card skintemp">
        <h2 class="sensortitle">Skin Temperature<br >(°C)</h2>        
        <h4 id="value3">{{ sensor3 }}</h4>
      </div>  
      <br>
    </div> 

    <div id="ctchart">
    <div id = "chart">    
     
    </div>
    
  </div>

  

  <div id = "ctindicator">
   
      <h2>Risk</h2>
        <div id="indicator">
          Level
        </div>
     
  </div>
  <hr />
  
   
  </div>
</template>

<script>

import axios from 'axios';   


export default {
  name: 'Monitoring',

  data() {
    return {
      msg: '',
      sensor2: '',
      sensor3: '',
     }
  },   
  methods: {
    
    getMessage() {
      const path = 'http://127.0.0.1:5000/emmiter';
      axios.get(path)
        .then((res) => {
          console.log(path)
          this.msg = (res.data).toFixed(2);
          this.sensor2 = (parseFloat(this.msg) * 2).toFixed(2)
          this.sensor3 = (parseFloat(this.msg) * 3).toFixed(2)
         
          return(this.msg, this.sensor2, this.sensor3)
          
        })  
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });      
    },

    getData() {
    return Math.random();
    },    

    
        
  },
  created() {
    
   
    this.interval = setInterval(() => this.getMessage(), 1000);
  
    
     
    
  },
};


</script>

<style> 
* {
  margin: 0;
  padding: 0;
  }

body{
  font-size: 20px;
  font-family: monospace;
  text-align:center;
  margin: 0 auto;
}

#title{
    color: #050A30;
    padding: 25px;

  
}

h2{
  font-weight: 800;
  font-size: 16px;
  padding: 5px;
}

h4{
  font-weight: 300;
  font-size: 14px;
}

 .cards {
  
  height:150px;
  padding: 3px; 
  padding-bottom: 5px;
  padding-top: 5px;
  display: flex;
  justify-content: center;
  margin-bottom: 0px;

  
  
} 

.card {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.6);
  transition: 0.3s;
  border-radius: 15px; /* 5px rounded corners */
  margin: 10px;
  padding: 30px; /* if you want space between the images */
  background-color: white;
  
}

#indicator {
  
  height: 60px;
  border: 1px solid #dddddd;
  margin: auto;
  width: 90%;
  border-radius: 50%;
  padding: 5px;
  line-height: 60px; 
  font-size: 20px;
  color: #fff;
  text-align: center;
  background-color: green;
  
}

#ctindicator{
  
  padding: 20px;
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.8);
  transition: 0.3s;
  border-radius: 15px; /* 5px rounded corners */
  margin: auto;
  background-color: white;
  width: 10%;
  padding: 20px;
  margin-top: 5px; 
  margin-bottom: 5px; 
  color: #919191;
  
}

#ctchart{
 padding: 5px;
 
}

#chart{
  padding: 0px;
  height: 400px;
  
}


#value1{
  padding:15px;
}

#value2{
  padding:15px;
}

#value3{
  padding:15px;
}

.sensortitle{
  color: #919191;
}


</style>