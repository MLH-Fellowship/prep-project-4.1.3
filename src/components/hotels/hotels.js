import React, {useState, useEffect, memo} from 'react';
import moment from "moment";
import HotelCarousel from './hotelCarousel';
import "../../assets/css/hotels.css";

const HotelsNearBy = (props) => {
    const inputForm = props.inputForm;
    const destCity = inputForm?.dest?.name;
    const startDate = inputForm?.date;

    // destCity: string, the name of the destination city
    // arrDate: {day: xx, month: xx, year: xx}
    const adults = 1;
    const daysStaying = 1;
    const [hotelList, setHotelList] = useState([]);

    function getDateStr(date) {
        let monthStr = date.month<10? `0${date.month}`: `${date.month}`;
        let dayStr = date.day<10? `0${date.day}`: `${date.day}`;
        return `${date.year}-${monthStr}-${dayStr}`;
    }


    function getHotels() {
        if (!destCity || !startDate) {
            return;
        }
        const url = "https://geocode.search.hereapi.com/v1/geocode?" +
            `q=${destCity}` +
            `&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(url)
            .then(res => res.json())
            .then(result => {
                const lon = result?.items[0].position.lng;
                const lat = result?.items[0].position.lat;
                const startDayStr = getDateStr(startDate);
                const endDayStr = moment(startDayStr, "YYYY-MM-DD")
                                    .add(daysStaying, "days")
                                    .format("YYYY-MM-DD");
                const queryUrl = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby?";
                const queryParams = `latitude=${lat}` +
                `&longitude=${lon}` +
                `&currency=USD` +
                `&checkin_date=${startDayStr}` +
                `&checkout_date=${endDayStr}` +
                `&locale=en_US` +
                `&adults_number=${adults}` +
                `&sort_order=STAR_RATING_HIGHEST_FIRST`;
                fetch(`${queryUrl}${queryParams}`, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
                        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI,
                    }
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    let newHotelList = result.searchResults.results.map(item => {
                        let address = item.address;
                        return {
                            name: item.name,
                            address: `${address.streetAddress}, ${address.locality}, ${address.postalCode}`,
                            price: item.ratePlan.price.current,
                            rating: item.starRating,
                            image_url: item.optimizedThumbUrls.srpDesktop,
                        };
                    });
                    setHotelList(newHotelList.slice(0,10));
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getHotels();
    },[inputForm]);

    return (
            <div className="hotel-list">
                {console.log(hotelList)}

                <HotelCarousel hotels={hotelList}/>
            </div>
    )
};

export default memo(HotelsNearBy);