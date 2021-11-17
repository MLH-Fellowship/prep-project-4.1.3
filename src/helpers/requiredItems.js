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
import Watch from '../assets/img/Watch.png';
import Sunscream from '../assets/img/Sunscream.png';
import MosquitoRepellent from '../assets/img/MosquitoRepellent.png';

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
	Mist: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Smoke: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Haze: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Dust: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Fog: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Sand: {
		Mask: Mask,
		Goggles: Goggles,
		'Sand Scarf': SandScarf,
	},
	Ash: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Squall: {
		Watch: Watch,
		Goggles: Goggles,
		Mask: Mask,
	},
	Tornado: {
		Sanitation: Sanitation,
		Flashlight: Flashlight,
		Goggles: Goggles,
	},
	Clear: {
		Sunglasses: Sunglasses,
		BaseballCap: Cap,
		Sunscream: Sunscream,
	},
	Clouds: {
		BaseballCap: Cap,
		Watch: Watch,
		'Mosquito Repellent': MosquitoRepellent,
	},
};

export default requiredItems;
