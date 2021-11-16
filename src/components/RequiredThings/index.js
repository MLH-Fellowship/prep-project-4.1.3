import React, { useState, useEffect } from 'react';
import requiredItems from '../../helpers/requiredItems';

const RequiredThings = (props) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(requiredItems[props.results.weather[0].main]);
	}, [props.results.weather[0].main]);

	return (
		<div className='required-things'>
			<h1>Don't forget to bring your</h1>
			<div className='cards'>
				{Object.keys(items).map((item, i) => (
					<div key={i} className='card-item'>
						<h1>{item}</h1>
						<div className='card-item-image'>
							<img src={items[item]} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RequiredThings;
