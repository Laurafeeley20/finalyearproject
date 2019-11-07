<template>
    <Page class="page">
        <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center">
            <TextField class="input" v-model="username" hint="Email"/>
            <TextField class="input" v-model="password" hint="Password" secure="true"/>
            <Button text="Login" @tap="login"/>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Home from './Home.vue'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        this.$store.dispatch('getUserAccessToken', {username: 'cregan@example.com', password: 'secret'})
          .then(() => {
            this.$navigateTo(Home, { clearHistory: true})
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
        color: white;
    }
</style>