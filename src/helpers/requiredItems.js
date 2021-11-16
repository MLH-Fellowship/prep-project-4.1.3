import Raincoat from '../assets/img/Raincoat.png';
import Towel from '../assets/img/Towel.png';
import Sanitation from '../assets/img/Sanitation.png';
import WaterResistantBagpack from '../assets/img/WaterResistantBagpack.png';
import WaterproofBoots from '../assets/img/WaterproofBoots.png';
import Umbrella from '../assets/img/Umbrella.png';
import Scarf from '../assets/img/Scarf.png';
import Cap from '../assets/img/Cap.png';
import Sunglasses from '../assets/img/Sunglasses.png';
import Gloves from '../assets/img/Gloves.png';
import Socks from '../assets/img/Socks.png';
import Mask from '../assets/img/Mask.png';
import Goggles from '../assets/img/Goggles.png';
import SandScarf from '../assets/img/Scarf.png';
import Flashlight from '../assets/img/Flashlight.png';
import Jacket from '../assets/img/Jacket.png';

const requiredItems = {
	Thunderstorm: {
		Raincoat: Raincoat,
		Towel: Towel,
		Flashlight: Flashlight,
		Sanitation: Sanitation,
		'Water Resistant Bagpack': WaterResistantBagpack,
		'Waterproof Boots': WaterproofBoots,
	},
	Drizzle: {
		Raincoat: Raincoat,
		Towel: Towel,
		'Waterproof Boots': WaterproofBoots,
		Umbrella: Umbrella,
	},
	Rain: {
		Raincoat: Raincoat,
		Towel: Towel,
		'Water Resistant Bagpack': WaterResistantBagpack,
		'Waterproof Boots': WaterproofBoots,
		Umbrella: Umbrella,
	},
	Snow: {
		Scarf: Scarf,
		Cap: Cap,
		Sunglasses: Sunglasses,
		Gloves: Gloves,
		Socks: Socks,
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
	Clear: {},
	Clouds: {},
};

export default requiredItems;
