import React, { Component } from 'react';
import './css/WeatherApp.css';
import WeatherAppView from './WeatherAppView';
import axios from 'axios';
import cloudy from './assets/cloudy.svg';
import drop from './assets/drop.svg';
import sun from './assets/sun.svg';
import moment from 'moment';

class WeatherApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: "Boston, USA",
            longitude: "-71.0588801",
            latitude: "42.3600825",
            forecast: [],
            week: [],
            currentTime: moment().format('LTS').toString()
        }
        this.getLocationFromCity = this.getLocationFromCity.bind(this);
        this.setInitialLocationState = this.setInitialLocationState.bind(this);
        this.getForecastFromCity = this.getForecastFromCity.bind(this);
        this.getForecast = this.getForecast.bind(this);
        this.getIconFromForecast = this.getIconFromForecast.bind(this);
    }

    componentDidMount() {
        let ref = this;
        ref.interval = setInterval(this.tick, 1000);
        let today = new Date();
        let forecast = [];
        for (var i = 0; i < 7; i++) {
            var date = new Date()
            date.setDate(today.getDate() + i);
            console.log(moment(date).format('dddd'));
            let day = moment(date).format('dddd');
            let mmmmDDYY = moment(date).format("MMM Do YY");
            console.log(moment(date).format("MMM Do YY"));
            let obj = {
                day: day,
                date: mmmmDDYY,
            }
            forecast.push(obj);
        }
        ref.setState({ forecast: forecast });
        ref.getForecast();
    }
    componentDidUpdate() { }

    componentWillReceiveProps() { }

    tick = () => {
        this.setState({
            currentTime: moment().format('LTS').toString()
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getLocationFromCity(e) {
        let ref = this;
        let city = e.target.value;;
        let mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city);

        // TODO: find solution for only spaces, /\S/.test(city) -- best so far
        if (city && /\S/.test(city)) {
            axios.get(mapsUrl)
                .then(function (response) {
                    let address = response.data.results[0].formatted_address;
                    let latitude = response.data.results[0].geometry.location.lat;
                    let longitude = response.data.results[0].geometry.location.lng;

                    ref.setState({ latitude: latitude });
                    ref.setState({ longitude: longitude });
                    ref.setState({ address: address })
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("No city entered, empty field!");
            ref.setInitialLocationState();
        }
    }

    setInitialLocationState() {
        let ref = this;
        const InitialLocationState = {
            address: "Boston, USA",
            longitude: "-71.0588801",
            latitude: "42.3600825",
        }
        ref.setState({ latitude: InitialLocationState.latitude });
        ref.setState({ longitude: InitialLocationState.longitude });
        ref.setState({ address: InitialLocationState.address })
    }

    getForecastFromCity(e) {
        let ref = this;
        if (e.keyCode === 13) {
            ref.getForecast();
        }
    }

    getForecast() {
        let ref = this;
        const API_KEY = "b46a0a9929dcf61adca11c238e61831e"; // FIXME: Set this as an environment variable
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        const API_URL_BASE = "https://api.darksky.net/forecast/";
        let latitude = ref.state.latitude;
        let longitude = ref.state.longitude;
        let excludes = "?exclude=flags"
        let DARK_SKY_URL = CORS_PROXY + API_URL_BASE + API_KEY + "/" + latitude + "," + longitude + excludes;
        axios.get(DARK_SKY_URL)
            .then(function (response) {
                console.log(response);
                let dailyForecast = response.data.daily.data;
                var forecast = ref.state.forecast;
                //dailyForecast.map(day => console.log(new Date(day.time * 1000)));
                for (var day in forecast) {
                    forecast[day].high = dailyForecast[day].temperatureMax;
                    forecast[day].low = dailyForecast[day].temperatureMin;
                    forecast[day].icon = ref.getIconFromForecast(dailyForecast[day].icon);
                }
                ref.setState({ forecast: forecast });
            })
            .catch(function (error) {
                console.log("Unable to make request to the dark sky api");
                console.log(error);
            })
    }

    getIconFromForecast(icon) {
        var _icon = cloudy;
        if (icon.includes('rain')) {
            _icon = drop;
        } else if (icon.includes('cloud')) {
            _icon = cloudy;
        } else if (icon.includes('clear')) {
            _icon = sun;
        } else {
            _icon = sun;
        }
        return _icon;
    }

    render() {
        return (
            <main>
                <div className="blurred-city">
                    <img src="https://images.unsplash.com/photo-1495460099476-135d23aadcb4?dpr=1&auto=format&fit=crop&w=1080&h=681&q=80&cs=tinysrgb&crop=" alt="" />
                </div>
                <WeatherAppView
                    address={this.state.address}
                    forecast={this.state.forecast}
                    getLocation={this.getLocationFromCity}
                    getForecast={this.getForecastFromCity}
                    week={this.state.week}
                    time={this.state.currentTime}
                />
            </main>
        )
    }
}

export default WeatherApp;