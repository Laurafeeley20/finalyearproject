<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label :text="username" @tap="$refs.drawer.nativeView.showDrawer()" />
        </ActionBar>
        <Label text="Navigation Menu"></Label>
        <!-- <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent class="sideStackLayout">
                <StackLayout class="sideTitleStackLayout">
                    <Label text="Navigation Menu"></Label>
                    <Label text="Bookings" @tap="redirect"></Label>
                </StackLayout>
                <Label text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: center"></Label>
            </StackLayout>
            <StackLayout ~mainContent>
                <Label text="MAIN CONTENT GOES HERE"></Label>
            </StackLayout>
        </RadSideDrawer> -->
    </Page>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                isAdmin: false
            }
        },
        computed: {
            username(){
                return this.$store.getters['username']
            }
        },
        methods: {
            redirect() {
                this.$navigateTo(Booking, { clearHistory: true})
            }
        },
        created () {
            this.$store.dispatch('getUserInformation')
        },
    }
</script>

<style lang="scss" scoped>
.action-bar{background:#25325c; color:white;}
.subheading{opacity: 0.6; font-size: 14; padding-left:15; font-weight: 500; width: 100%;}
.heading{ padding-left: 15; font-weight: 300; font-size: 16;}
</style>