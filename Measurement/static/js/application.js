


$(document).ready(function(){
  //connect to the socket server.
  var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
 
  var cnt = 0;
  //receive details from server
  socket.on('newnumber', function(msg) {
      // console.log("Received number " + msg.number + typeof msg.number);
 
      $('#value1').html((msg.number * 100).toFixed(2));
      $('#value2').html((msg.number).toFixed(2));
      $('#value3').html((msg.number * 30).toFixed(2));
      if (((msg.number * 100) > 50) && ((msg.number * 100) < 70)){
        document.getElementById("indicator").style.backgroundColor = "#E8F300";
        document.getElementById("indicator").innerHTML = "MEDIUM";
        document.getElementById("heartrate").style.boxShadow = "0px 4px 8px 0px rgba(232,243,0,0.8)";
      }
      else if((msg.number * 100) > 70){
        document.getElementById("indicator").style.backgroundColor = "red";
        document.getElementById("indicator").innerHTML = "HIGH";
        document.getElementById("heartrate").style.boxShadow = "0px 4px 8px 0px rgba(255,0,0,0.8)";
      }
      else{
        document.getElementById("indicator").style.backgroundColor = "green";
        document.getElementById("indicator").innerHTML = "LOW";
        document.getElementById("heartrate").style.boxShadow = "0px 4px 8px 0px rgba(0,0,0,0.8)";
      }      
   });



  function getData() {
    return Math.random();
  }

  
  Plotly.plot('chart',[{
    y:[getData()],
    type:'line',
    displayModeBar: false
  }]);      
  
  
  setInterval(function() {
    Plotly.extendTraces('chart', { y: [[getData()]] }, [0])
    cnt++;
    if(cnt > 125) {
      Plotly.relayout('chart',{
           xaxis: {
                    range: [cnt-125,cnt]
                 }
      });
     }
  }, 200); 
  
  let vm = Vue.createApp({
    data() {
      return {
        name: 'Saulo' //this stores data values for ‘name’
      }
    }
  }).mount('#app')
});

