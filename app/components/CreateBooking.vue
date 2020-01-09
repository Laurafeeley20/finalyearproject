<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label :text="username" @tap="$refs.drawer.nativeView.showDrawer()" />
        </ActionBar>
                    <StackLayout class="form">
  <StackLayout class="input-field">
    <TextField class="input"></TextField>
  </StackLayout>

  <StackLayout class="input-field">
    <TextField class="input"></TextField>
  </StackLayout>

  <Button text="Log In" class="btn btn-primary"></Button>
</StackLayout>
    </Page>
</template>

<script>
    export default {
        name: 'CreateBookings',
        computed: {
            username(){
                return this.$store.getters['username']
            },
        }
    }
</script>

<style lang="scss" scoped>
.action-bar{background:#25325c; color:white;}
</style>