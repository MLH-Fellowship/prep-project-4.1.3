import React, {useState, useEffect, memo} from 'react';
import Select from 'react-select';
import moment from "moment";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import './hotels.css';

const HotelsNearBy = (props) => {
    const inputForm = props.inputForm;
    const destCity = inputForm?.dest?.name;
    const startDate = inputForm?.date;

    // destCity: string, the name of the destination city
    // arrDate: {day: xx, month: xx, year: xx}
    const [adults, setAdults] = useState(1);
    const [daysStaying, setDaysStaying] = useState(1);
    const [hotelList, setHotelList] = useState([]);

    function getDateStr(date) {
        let monthStr = date.month<10? `0${date.month}`: `${date.month}`;
        let dayStr = date.day<10? `0${date.day}`: `${date.day}`;
        return `${date.year}-${monthStr}-${dayStr}`;
    }

    // Get an array of [{label: 1, value: 1}, {label: 2, value: 2}, etc.]
    function getOptions(numOptions) {
        return new Array(numOptions).fill('')
            .map((item, i) => {return {label: `${i+1}`, value: i+1};});
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
                        };
                    });
                    setHotelList(newHotelList);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getHotels();

    const peopleOptions = getOptions(7);
    const daysOptions = getOptions(30);

    return (
        <div>
            <div className="hotels-header">
                <div className="hotels-people-select-text">
                    Number of people:&nbsp;
                </div>

                <Select
                    options={peopleOptions}
                    className="hotels-people-select"
                    defaultValue={peopleOptions[0]}
                    onChange={(item) => setAdults(item.value)}
                />

                <div className="hotels-days-select-text">
                    Number of days:&nbsp;
                </div>

                <Select
                    options={daysOptions}
                    className="hotels-days-select"
                    defaultValue={daysOptions[0]}
                    onChange={(item) => setDaysStaying(item.value)}
                />
            </div>
            <div className="hotel-list">
                <Table data={hotelList} width={1000}>
                    <Column width={250} align="center" fixed>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={750} align="center" fixed>
                        <HeaderCell>Address</HeaderCell>
                        <Cell dataKey="address" />
                    </Column>
                    <Column width={250} align="center" fixed>
                        <HeaderCell>Price</HeaderCell>
                        <Cell dataKey="price" />
                    </Column>
                </Table>
            </div>
        </div>
    )
};

export default memo(HotelsNearBy);