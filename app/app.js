import Vue from "nativescript-vue";

import App from "./components/App";

import store from './store'

import CalendarView from 'nativescript-ui-calendar/vue';

Vue.use(CalendarView);

Vue.config.silent = false;

Vue.registerElement(
    'CardView',
    () => require('@nstudio/nativescript-cardview').CardView
  );

new Vue({
    store,
    template: `
        <Frame>
            <App />
        </Frame>`,

    components: {
        App
    }
}).$start();
