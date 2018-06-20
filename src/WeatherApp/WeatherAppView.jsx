import React from 'react';
import pin from './assets/pin.svg';
// import cloudy from './assets/cloudy.svg';
// import drop from './assets/drop.svg';
// import sun from './assets/sun.svg';

// TODO: Credit the icon makers
// https://www.flaticon.com/packs/weather-set-2
// https://www.flaticon.com/packs/weather-53

const WeatherAppView = (props) => (
    <div className="weather-container">
        <section className="location">
            <img src="https://images.unsplash.com/photo-1495460099476-135d23aadcb4?dpr=1&auto=format&fit=crop&w=1080&h=681&q=80&cs=tinysrgb&crop=" alt="" />
            <div className="panel">
                <img src={pin} className="pin" alt="pin" />
                <p>{props.time}</p>
                <p>{props.address}</p>
            </div>
            <input type="text" placeholder="Boston" onChange={props.getLocation} onKeyDown={props.getForecast} />
        </section>
        <section className="forecast">
            {props.forecast.map(day => {
                if (props.forecast[0] == day) {
                    return (
                        <div>
                            <span className="temperature">{Math.round(day.high)}&deg;</span>
                            <img src={day.icon} alt="" />
                            <span className="day">{day.day}, {day.date}</span>
                        </div>
                        );
                } else {
                return (
                    <div className="small-">
                        <span className="day">{day.day.substring(0,3)}</span>
                        <span className="date">{day.date}</span>
                        <img src={day.icon} alt="" />
                        <span className="temperature">{Math.round(day.high)}&deg; / {Math.round(day.low)}&deg;</span>
                    </div>
                    );
                }
            })}
        </section>
    </div>
)

export default WeatherAppView;