<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label :text="username" @tap="$refs.drawer.nativeView.showDrawer()" />
        </ActionBar>
        <StackLayout>
            <CardView class="card" elevation="40" radius="10" ios:shadowRadius="3" v-for="(booking, index) in bookings" :key="index">
                <StackLayout class="card-layout">
                    <Label class="h2">{{ bookings.booking_type }}</Label>
                    <Label class="body" textWrap="true">{{ booking.booking_type === 'Private' ? 'Private: 1-on-1 with Christopher Shannon' : state.firstUserBooking.booking_type }} - {{ booking.date }} @ {{ booking.time }}</Label>
                </StackLayout>
            </CardView> 
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: 'ShowAllBookings',
        computed: {
            username(){
                return this.$store.getters['username']
            },
            bookings(){
                return this.$store.getters['bookings']
            }
        },
    }
</script>

<style lang="scss" scoped>
.action-bar{background:#25325c; color:white;}
</style>