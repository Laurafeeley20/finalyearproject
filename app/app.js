import Vue from "nativescript-vue";

import App from "./components/App";

import store from './store'

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
