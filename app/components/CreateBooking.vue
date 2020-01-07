<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label :text="username" @tap="$refs.drawer.nativeView.showDrawer()" />
        </ActionBar>
        <StackLayout>
                    <Label>Hello</Label>
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