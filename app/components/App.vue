<template>
    <Page class="page">
        <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center">
            <TextField class="input" v-model="username" hint="Email"/>
            <TextField class="input" v-model="password" hint="Password" secure="true"/>
            <Button text="Login" @tap="login" class="button"/>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Home from './Home.vue'

  export default {
    components: {
      Home,
    },
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        this.$store.dispatch('getUserAccessToken', {username: 'admin@csfitness.com', password: 'secret'})
          .then(() => {
            this.$navigateTo(Home, {clearHistory: true})
          })
      }
    },
  }
</script>

<style scoped>
    .page {
      background: #25325c;
    }
    .action-bar{
      background: #021042;
      display: none;
    }
    .input{
        width: 90%;
        border-color: white;
        color: black;
    }
    .input-inner{
        width: 90%;
        border-color: white;
        color: black;
    }
    .button{
      width: 90%;
      background: black;
      color: white;
      margin: 10 0;
      padding: 20;
    }
</style>