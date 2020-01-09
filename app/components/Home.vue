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
                                            <Label class="h3">{{ booking.booking_type }} - {{ booking.username}} @ {{ booking.time }}</Label>
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
                            <ListPicker class="picker" :items="getAllUsersForAdmin" v-model="selectedUser" />
                            <!-- <TimePicker :hour="selectedHour" :minute="selectedMinute" /> -->
                            <DatePickerField @dateChange="onDateChange" class="picker other-class" hint="select date"></DatePickerField>
                            <TimePickerField @timeChange="onTimeChange" class="picker other-class" hint="select time"></TimePickerField>
                            <!-- <TextField class="input-inner" hint="Enter the user id" /> -->
                            <Button text="Create new booking" @tap="createBooking" class="button"/>
                            <Button text="Clear" @tap="clearCreateBookingForm" class="button-clear"/>
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
import moment from 'moment'
import axios from 'axios'

    import CreateBooking from './CreateBooking.vue'
    import ShowAllBookings from './general/ShowAllBookings.vue'

    import { CalendarEvent } from 'nativescript-ui-calendar';

    export default {
        name: 'Home',
        components: {
        },
        data() {
            return {
                events: null,
                listOfItems: ['Please select a user', 'Laura Feeley', 'Ciaran Cregan'],
                selectedUser: '',
                selectedDate: '',
                selectedTime: '',
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
            },
            getAllUsersForAdmin(){
                let users =  this.$store.getters['allUsers']
                let userName = ['Please select a user']
                for (let i = 0; i < users.length; i++){
                    userName.push(users[i].name)
                }
                console.log(userName)
                this.listOfItems = userName;
                return userName
            }
        },
        methods: {
            showAllBookings(){
                this.$navigateTo(ShowAllBookings)
            },
            changePage(){
                this.$navigateTo(CreateBooking)
            },
            createBooking(){
                if (this.selectedUser === '' || this.selectedDate === '' || this.selectedTime === ''){
                    alert('Please enter date to create a booking')
                } else {
                    axios.post('http://127.0.0.1:8888/example-project/public/api/bookings', {
                    username: this.listOfItems[this.selectedUser],
                    date: this.selectedDate,
                    booking_type: 'Private',
                    time: this.selectedTime
                    })
                        .then((response) => {
                        this.selectedUser = 'Please select a user'
                        })
                        .catch((error) => {
                        alert('Something went wrong - try again')
                    })
                    // console.log(this.listOfItems[this.selectedUser])
                    // console.log(this.selectedDate)
                    // console.log(this.selectedTime)
                }
            },
            clearCreateBookingForm(){
                this.selectedUser = ''
                this.selectedDatec = ''
                this.selectedTime = ''
            },
            onDateChange: function(args) {
                this.selectedDate = moment(args.value).format('DD/MM/YYYY');
            },
            onTimeChange: function(args) {
                this.selectedTime = moment(args.value).format('h:mm');
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
.input-field {
		margin-bottom: 25;
	}
    .picker{
        width: 90%;
        text-align: center;
    }
    .other-class{
        margin: 10 0;
        padding: 10;
        border-width: 2;
    border-color: #4d4d4d;
    border-radius: 5;
    }
.form{
    margin-top: 2;
}
	.input {
        background: white;
        margin: 10 0;
        padding: 10;
		font-size: 18;
	}

    .input-inner {
        width: 90%;
        background: lightgrey;
        margin: 10 0;
        padding: 10;
		font-size: 18;
	}

	.input-field .input {
		font-size: 54;
	}
    .button{
      width: 90%;
      background: black;
      color: white;
      margin: 10 0;
      padding: 20;
    }
    .button-clear{
      width: 90%;
      background: red;
      color: white;
      margin: 10 0;
      padding: 20;
    }
</style>