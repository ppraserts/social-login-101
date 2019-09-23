<template>
  <div>
    <h1>{{ msg }}</h1>
    <label class="req">*</label> Email: <input type="email" ref="email" v-model="loginForm.email">
    <label class="req">*</label> Password: <input type="password" ref="password" v-model="loginForm.password">
    <br/>
    <button v-on:click="ccdcLogin">Login</button>
    <button v-on:click="socialGoogleLogin">Google</button>
    <button v-on:click="socialFacecbookLogin">Facebook</button>
    <br/>
    <div v-if="displayProfile.logged">
      <h2>Login As {{ displayProfile.firstname }} {{ displayProfile.lastname }} {{ displayProfile.email }}</h2><br/>
      <img v-bind:src="displayProfile.image" alt="">
    </div>
    <br/>
    <h2>Register</h2>
    <label class="req">*</label> Firstname: <input type="text" ref="firstname" v-model="signupForm.firstname"><br/>
    <label class="req">*</label> Lastname: <input type="text" ref="lastname" v-model="signupForm.lastname"><br/>
    <label class="req">*</label> Gender: <select ref="gender" v-model="signupForm.gender">
              <option v-for="genderItem in genders" 
                      v-bind:key="genderItem.id" 
                      v-bind:value="genderItem.value">{{genderItem.text}}</option>
            </select><br/>
    <label class="req">*</label> Birthday(2019-12-31): <input type="text" ref="birthday" v-model="signupForm.birthday"><br/>
    <label class="req">*</label> Email: <input type="email" ref="email1" v-model="signupForm.email"><br/>
    <label class="req">*</label> Password: <input type="password" ref="password1" v-model="signupForm.password"><br/>
    <button v-on:click="ccdcSignUp">Sign up</button>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  name: 'Login',
  data() {
    return {
      displayProfile: {
        firstname: "",
        lastname: "",
        email: "",
        image: "",
        logged: false
      },
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        firstname: "",
        lastname: "",
        gender: "",
        birthday: "",
        email: "",
        password: ""
      },
      genders: [{ id: 0, text: "Male", value: "M" }
              ,{ id: 1, text: "Female", value: "F" }]
    }
  },
  props: {
    msg: String
  },
  methods: {
    ccdcLogin: function() {
      if(this.loginForm.email === "") {
        alert("please fill email");
        this.$refs.email.focus();
        return false;
      }
      if(this.loginForm.password === "") {
        alert("please fill password");
        this.$refs.password.focus();
        return false;
      }
      return false;
    },
    ccdcSignUp: function() {
      if(this.signupForm.firstname === "") {
        alert("please fill firstname");
        this.$refs["firstname"].focus();
        return false;
      }
      if(this.signupForm.lastname === "") {
        alert("please fill lastname");
        this.$refs.lastname.focus();
        return false;
      }
      if(this.signupForm.gender === "") {
        alert("please fill gender");
        this.$refs.gender.focus();
        return false;
      }
      if(this.signupForm.birthday === "") {
        alert("please fill birthday");
        this.$refs.birthday.focus();
        return false;
      }
      if(this.signupForm.email === "") {
        alert("please fill email");
        this.$refs.email1.focus();
        return false;
      }
      if(this.signupForm.password === "") {
        alert("please fill password");
        this.$refs.password1.focus();
        return false;
      }
      return false;
    },
    socialGoogleLogin: function() {
      const provide = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          let obj = {
            google_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            firstname: result.additionalUserInfo.profile.given_name,
            lastname: result.additionalUserInfo.profile.family_name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.additionalUserInfo.profile.picture,
            user_type_id: 1,
            logged: true
          };
          this.displayInfo(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    socialFacecbookLogin: function() {
      const provide = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          let obj = {
            facebook_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            firstname: result.additionalUserInfo.profile.first_name,
            lastname: result.additionalUserInfo.profile.last_name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.user.photoURL + "?height=500",
            user_type_id: 1,
            logged: true
          };
          this.displayInfo(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    displayInfo: function(userInfo) {
        this.displayProfile.firstname = userInfo.firstname;
        this.displayProfile.lastname = userInfo.lastname;
        this.displayProfile.image = userInfo.profile_image;
        this.displayProfile.logged = userInfo.logged;
        this.displayProfile.email = userInfo.email;
    }
  },
  mounted() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (console.log(response.data.bpi)));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.req{
  color: red;
}
</style>
