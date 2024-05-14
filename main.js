const app = Vue.createApp({
    data(){
        return{
            searchText: '',
            venuesList: [],
            show: false,
            venue: {},
        }
    },

    async mounted(){
        this.listResult = await this.getData();
    },

    computed:{
        listResult(){
            if(this.searchText){
                return this.venuesList.filter(venue => {
                    return venue.brandName.toLowerCase().includes(this.searchText.toLowerCase());
                });
            }else{
                return this.venuesList
            }
        }
    },

    methods:{
        async getData(){
            let response = await fetch('http://localhost:3000/api/v1/venues/');
            let data = await response.json();

            data.forEach(item => {
                var venue = new Object();
                venue.id = item.id;
                venue.link = `http://localhost:3000/api/v1/venues/${venue.id}`
                venue.brandName = item.brand_name;
                venue.city = item.city;
                venue.state = item.state;

                this.venuesList.push(venue);
            })
        },

        async showVenue(id){
            let response = await fetch(`http://localhost:3000/api/v1/venues/${id}`);
            let data = await response.json();
            console.log(data);
            this.show = true;

            this.venue.brandName = data.brand_name;
            this.venue.description = data.description;
            this.venue.address = data.address;
            this.venue.district = data.district;
            this.venue.city = data.city;
            this.venue.state = data.state;
            this.venue.zipCode = data.zip_code;
            this.venue.paymentMethods = data.payment_methods;
            this.venue.email = data.email;
            this.venue.phone = data.phone_number;
        },

        refresh(){
            this.show = false;
            this.searchText = '';
        }
    },
    
})

app.mount('#app');
