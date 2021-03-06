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
        const lon = inputForm.destLongitude;
        const lat = inputForm.destLatitude;
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
                "X-RapidAPI-Key": `${process.env.REACT_APP_RAPIDAPI}`,
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
                    booking_url: `https://www.hotels.com/ho${item.id}/?`
                        + `q-check-in=${startDayStr}`
                        + `&q-check-out=${endDayStr}`
                        + `&q-rooms=1`
                        + `&q-room-0-adults=${adults}`,
                };
            });
            setHotelList(newHotelList.slice(0,10));
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