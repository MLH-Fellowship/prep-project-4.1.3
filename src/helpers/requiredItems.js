import Raincoat from '../assets/img/Raincoat.png';
import Sanitation from '../assets/img/Sanitation.png';
import WaterproofBoots from '../assets/img/WaterproofBoots.png';
import Umbrella from '../assets/img/Umbrella.png';
import Cap from '../assets/img/Cap.png';
import Sunglasses from '../assets/img/Sunglasses.png';
import Gloves from '../assets/img/Gloves.png';
import Mask from '../assets/img/Mask.png';
import Goggles from '../assets/img/Goggles.png';
import SandScarf from '../assets/img/Scarf.png';
import Flashlight from '../assets/img/Flashlight.png';
import Jacket from '../assets/img/Jacket.png';

const requiredItems = {
	Thunderstorm: {
		Raincoat: Raincoat,
		Flashlight: Flashlight,
		'Waterproof Boots': WaterproofBoots,
	},
	Drizzle: {
		Raincoat: Raincoat,
		'Waterproof Boots': WaterproofBoots,
		Umbrella: Umbrella,
	},
	Rain: {
		Raincoat: Raincoat,
		'Waterproof Boots': WaterproofBoots,
		Umbrella: Umbrella,
	},
	Snow: {
		Sunglasses: Sunglasses,
		Gloves: Gloves,
		Jacket: Jacket,
	},
	Mist: {},
	Smoke: {
		Mask: Mask,
	},
	Haze: {
		Mask: Mask,
	},
	Dust: {
		Mask: Mask,
	},
	Fog: {},
	Sand: {
		Mask: Mask,
		Goggles: Goggles,
		'Sand Scarf': SandScarf,
	},
	Ash: {
		Mask: Mask,
	},
	Squall: {},
	Tornado: {
		Sanitation: Sanitation,
		Flashlight: Flashlight,
	},
	Clear: {
		Sunglasses: Sunglasses,
		BaseballCap: Cap,
	},
	Clouds: {},
};

export default requiredItems;
