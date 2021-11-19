import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default class SearchOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        items: [],
        city: "",
        };

        this.autocompleteCity = this.autocompleteCity.bind(this);
        this.updateWeatherDetails = this.updateWeatherDetails.bind(this);
    }

    autocompleteCity(city) {
        this.setState({ city: city });
        const url =
        "https://autocomplete.search.hereapi.com/v1/autocomplete?";

        if (city !== "") {
        var query = `q=${city}&limit=5&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(`${url}${query}`)
            .then((res) => res.json())
            .then((result) => {

            const set = result?.items?.map((item) => `${item.address.city}, ${item.address.state}, ${item.address.countryCode}`);
            const cities = [...new Set(set)];

            // in case there are no suggestions, the input text can still be selected.
            let tempcities = [{id: 0, name: city}];
            var id = 1;
            cities.forEach((city) => {
                tempcities.push({ id: id, name: city });
                id++;
            });

            this.setState({ items: tempcities });
            });
        }
    }

    updateWeatherDetails = (item) => {
        this.props.updateCity(item.name)
    }

    render() {
        return (
        <>
            <div >
            <header className="box-header" style={{maxWidth:'500px', margin: '0 auto'}}>
                <ReactSearchAutocomplete
                items={this.state.items}
                onSearch={(record) => this.autocompleteCity(record)}
                onSelect={this.updateWeatherDetails}
                autoFocus
                useCaching={false}
                placeholder="Type name of city here!!"
                />
            </header>
            </div>
        </>
        );
    }
}