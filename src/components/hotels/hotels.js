import React, {useState, useEffect, memo} from 'react';
import Select from 'react-select';
import './hotels.css';

const HotelsNearBy = (props) => {
    const inputForm = props.inputForm;

    // destCity: string, the name of the destination city
    // arrDate: {day: xx, month: xx, year: xx}
    const [adults, setAdults] = useState(1);
    const [daysStaying, setDaysStaying] = useState(1);

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

    const peopleOptions = getOptions(9);
    const daysOptions = getOptions(30);

    useEffect(() => {
        console.log(inputForm);
        if (inputForm == null)
            return;
        const startDayStr = getDateStr(inputForm.date);
        console.log(startDayStr);
    }, [adults, daysStaying]);

    return (
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
    )
};

export default memo(HotelsNearBy);