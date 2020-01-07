<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label :text="username" @tap="$refs.drawer.nativeView.showDrawer()" />
        </ActionBar>
        <ScrollView>
        <StackLayout v-if="isAdmin">
                <TabView id="admin">
                    <TabViewItem title="Home">
                        <StackLayout>
                            <Label class="h1 title">Todays Schedule: </Label>
                            <CardView class="card" elevation="40" radius="10" ios:shadowRadius="3" v-if="bookings.length === 0">
                                <StackLayout class="card-layout">
                                    <Label class="h2">No clients scheduled for today</Label>
                                </StackLayout>
                            </CardView> 
                            <CardView class="card" elevation="40" radius="10" ios:shadowRadius="3" v-else>
                                <StackLayout class="card-layout">
                                    <ListView for="(booking, index) in bookings" :key="index">
                                        <v-template>
                                            <Label class="h3">{{ booking.booking_type }} - {{ booking.user_id }} @ {{ booking.time }}</Label>
                                        </v-template>
                                    </ListView>
                                </StackLayout>
                            </CardView> 
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Manage Bookings">
                        <StackLayout>
                            <Button text="Day" @tap="changePage" />
                            <RadCalendar :eventSource="events" eventsViewMode="Inline" viewMode="Month"/>
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Create Booking">
                        <StackLayout>
                            <Label class="h2">No clients scheduled for today</Label>
                        </StackLayout>
                    </TabViewItem>
                </TabView>
        </StackLayout>
        <StackLayout v-else>
                <TabView id="tabViewContainer">
                    <TabViewItem title="Home">
                        <StackLayout>
                            <CardView class="card" elevation="40" radius="10" ios:shadowRadius="3" @tap="showAllBookings">
                                <StackLayout class="card-layout">
                                    <Label class="h2">You have {{ bookings.length}} bookings</Label>
                                    <Label class="body" textWrap="true">Next up: {{ firstBooking }} </Label>
                                </StackLayout>
                            </CardView> 
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Classes">
                        <StackLayout>
                            <Button text="Click me to change page" @tap="showAllBookings" />
                            <Label text="Second Tab" textWrap="true" class="m-15 h2 text-left" color="blue" />
                        </StackLayout>
                    </TabViewItem>
                </TabView>
        </StackLayout>
        </ScrollView>
        
    </Page>
</template>

<script>
    import CreateBooking from './CreateBooking.vue'
    import ShowAllBookings from './general/ShowAllBookings.vue'

    import { CalendarEvent } from 'nativescript-ui-calendar';

    export default {
        name: 'Home',
        components: {
        },
        data() {
            return {
                events: null
            }
        },
        computed: {
            username(){
                return this.$store.getters['username']
            },
            firstBooking(){
                return this.$store.getters['firstUserBooking']
            },
            bookings(){
                return this.$store.getters['bookings']
            },
            isAdmin(){
                return this.$store.getters['isAdmin']
            }
        },
        methods: {
            showAllBookings(){
                this.$navigateTo(ShowAllBookings)
            },
            changePage(){
                this.$navigateTo(CreateBooking)
            }
        },
        created () {
            this.$store.dispatch('getUserInformation');
            let date = new Date()
            let eventitles = ['Title 1', 'Title 2', 'Title 3']
            let eventss = []

            var j = 1

            for (let i = 0; i < eventitles.length; i++){
                var startDate = new Date(date.getFullYear(), date.getMonth(), j * 2, 12);
                var endDate = new Date(date.getFullYear(), date.getMonth(), j * 2, 13);
                var event = new CalendarEvent(eventitles[i], startDate, endDate);
                eventss.push(event)
                j++
            }

            this.events = eventss
        },
    }
</script>

<style lang="scss">
.action-bar{background:#25325c; color:white;}
.subheading{opacity: 0.6; font-size: 14; padding-left:15; font-weight: 500; width: 100%;}
.heading{ padding-left: 15; font-weight: 300; font-size: 16;}
.card {
    background-color: #fff;
    color: #4d4d4d;
    margin: 15 15 0;
}
.title{
    padding-top: 10;
    padding-left: 20;
}
.card-layout {
    padding: 20;
}
.card-layout .h1 {
    margin-bottom: 15;
}
</style>