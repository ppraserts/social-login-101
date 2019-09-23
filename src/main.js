import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAL1qOj40VQCi7vCBtw8J6yZBD9MVMVohg",
  authDomain: "cmu-ccdc-app.firebaseapp.com",
  databaseURL: "https://cmu-ccdc-app.firebaseio.com",
  projectId: "cmu-ccdc-app",
  storageBucket: "",
  messagingSenderId: "718784381809",
  appId: "1:718784381809:web:fd5a3640dc603033b62cd0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
}).$mount('#app')
