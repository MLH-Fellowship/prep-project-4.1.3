import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Navbar from '../../components/Navbar';


function TripPlanner() {

    const [inputDate, setInputDate] = useState(new Date());

    const [sourceItems,setSourceItems] = useState([]);
    const [destItems,setDestItems] = useState([]);



    const [inputSource,setInputSource] = useState();
    const [inputDest,setInputDest] = useState();

    const [source,setSource] = useState();
    const [dest,setDest] = useState();

    const autocompleteSource = (item) => {
        setInputSource(item)
        const url =
        "https://autocomplete.search.hereapi.com/v1/autocomplete?";

        if (inputSource !== "") {
        var query = `q=${inputSource}&limit=5&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(`${url}${query}`)
            .then((res) => res.json())
            .then((result) => {

            const set = result?.items?.map((item) => `${item.address.city}, ${item.address.state}, ${item.address.countryCode}`);
            const cities = [...new Set(set)];

            // in case there are no suggestions, the input text can still be selected.
            let tempcities = [{id: 0, name: inputSource}];
            var id = 1;
            cities.forEach((city) => {
                tempcities.push({ id: id, name: city });
                id++;
            });

            setSourceItems(tempcities);
            });
        }
      }


    const autocompleteDest = (item) => {
        setInputDest(item)
        const url =
        "https://autocomplete.search.hereapi.com/v1/autocomplete?";

        if (inputSource !== "") {
        var query = `q=${inputDest}&limit=5&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(`${url}${query}`)
            .then((res) => res.json())
            .then((result) => {

            const set = result?.items?.map((item) => `${item.address.city}, ${item.address.state}, ${item.address.countryCode}`);
            const cities = [...new Set(set)];

            // in case there are no suggestions, the input text can still be selected.
            let tempcities = [{id: 0, name: inputDest}];
            var id = 1;
            cities.forEach((city) => {
                tempcities.push({ id: id, name: city });
                id++;
            });

            setDestItems(tempcities);
            });
        }
      }

    const updateSource = (item) => {
        // the item selected
        setSource(item);
        console.log("source");
        console.log(item)
      }

    const updateDest = (item) => {
        // the item selected
        setDest(item);
        console.log("dest" + item);
        console.log(item)
      }

    return (
        <>
			<Navbar />
            <h1>Trip Planner</h1>
            <div className="trip-input">
                <div className="trip-input-child">
                    Source
                    <ReactSearchAutocomplete
                    items={sourceItems}
                    onSearch={(record) => autocompleteSource(record)}
                    onSelect={updateSource}
                    autoFocus
                    useCaching={false}
                    placeholder="Type name of city here!!"
                    />
                </div>
                <div className="trip-input-child">
                    Destination
                    <ReactSearchAutocomplete
                    items={destItems}
                    onSearch={(record) => autocompleteDest(record)}
                    onSelect={updateDest}
                    autoFocus
                    useCaching={false}
                    placeholder="Type name of city here!!"
                    />
                </div>
                <div className="trip-input-child">
                    Travel date
                <DatePicker
                selected={inputDate}
                onChange={(date) => setInputDate(date)}
				className="black-border"
                />
                </div>
            </div>
            
        </>
    )
}

export default TripPlanner
