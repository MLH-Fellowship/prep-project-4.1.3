import React from 'react';

const Loader = () => {
	return (
		<div className="loader">
			<svg>
				<circle
					cx='50'
					cy='50'
					r='40'
					stroke='white'
					strokeDasharray='78.5 235.5'
					strokeWidth='3'
					fill='none'
				/>
				<circle
					cx='50'
					cy='50'
					r='30'
					stroke='#F09D51'
					strokeDasharray='62.8 188.8'
					strokeWidth='3'
					fill='none'
				/>
				<circle
					cx='50'
					cy='50'
					r='20'
					stroke='#F06543'
					strokeDasharray='47.1 141.3'
					strokeWidth='3'
					fill='none'
				/>
			</svg>
		</div>
	);
};

export default Loader;
