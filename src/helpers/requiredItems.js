import Raincoat from '../assets/img/Raincoat.png';
import Flashlight from '../assets/img/Flashlight.png';

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
		HeadCap: HeadCap,
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
