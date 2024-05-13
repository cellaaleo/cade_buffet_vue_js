const app = Vue.createApp({
    data(){
        return{
            brandName: '',
            city: '',
            state: '',

            venuesList: [],
        }
    },

    async mounted(){
        await this.getData();
    },

    methods:{
        async getData(){
            let response = await fetch('http://localhost:3000/api/v1/venues/');
            let data = await response.json();

            data.forEach(item => {
                var venue = new Object();
                venue.brandName = item.brand_name;
                venue.city = item.city;
                venue.state = item.state;

                this.venuesList.push(venue);
            })
        }
    },
    
})

app.mount('#app');
