<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <p>Unique ID is: {{ uniqueid }}</p>
    <input v-model="uniqueid" placeholder="Type your Unique ID">
    <br>
    <button>Start</button>
  
  </div>
</template>

<script>

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// export default {
//   name: 'Home',
//   components: {
//     HelloWorld
//   }
// }
  export default{
    data (){
      return{
        value: [],
        uniqueid: '',
        
      }
    },

    mounted(){
      
    }
  }
</script>
