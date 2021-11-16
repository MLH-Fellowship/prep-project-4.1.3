import React, { useState, useEffect } from 'react';
import requiredItems from '../../helpers/requiredItems';

const RequiredThings = (props) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(requiredItems[props.results.weather[0].main]);
	}, [props.results.weather[0].main]);

	return (
		<>
		<h1>Don't forget to bring your</h1>
		<div class="required-things">
			{Object.keys(items).map((item, i) => (
				<div class="card-item">
					<div class="face face1">
						<div class="content">
							<div class="icon">
								<img src={items[item]} />
							</div>
						</div>
					</div>
					<div class="face face2">
						<div class="content">
							<h3>{item}</h3>
						</div>
					</div>
				</div>
			))}
		</div>
		</>
	);
};

export default RequiredThings;
