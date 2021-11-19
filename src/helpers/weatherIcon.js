import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun} from '@fortawesome/free-regular-svg-icons';
import {faCloudSun, 
        faCloudMoon, 
        faCloud, 
        faCloudMeatball, 
        faCloudShowersHeavy,
        faCloudSunRain,
        faCloudMoonRain,
        faCloudRain,
        faSnowflake,
        faSmog,
        faMoon
    } from '@fortawesome/free-solid-svg-icons'

function weatherIcon(iconString) {
    switch (iconString){
        case '01d': return (
                        <FontAwesomeIcon style={{
                            color:'darkorange'
                        }} icon={faSun}/>
                    );
                    
        case '01n': return (
                        <FontAwesomeIcon style={{
                            color:'gray'
                        }} icon={faMoon}/>
                    );
                    
        case '02d': return (
                        <FontAwesomeIcon icon={faCloudSun}/>
                    );
                    
        case '02n': return (
                        <FontAwesomeIcon icon={faCloudMoon}/>
                    );
                    
        case '03d':
        case '03n': return (
                        <FontAwesomeIcon icon={faCloud}/>
                    );
                    
        case '04d':
        case '04n': return (
                        <FontAwesomeIcon icon={faCloudMeatball}/>
                    );
                    
        case '09d':
        case '09n': return (
                        <FontAwesomeIcon icon={faCloudRain} />
                    );
                    
        case '10n': return (
                        <FontAwesomeIcon icon={faCloudMoonRain}/>
                    );
                    
        case '10d': return (
                        <FontAwesomeIcon icon={faCloudSunRain} />
                    );
                    
        case '11d':
        case '11n': return (
                        <FontAwesomeIcon icon={faCloudShowersHeavy}/>
                    );
                    
        case '13d':
        case '13n': return (
                        <FontAwesomeIcon icon={faSnowflake}/>
                    );
                    
        case '50d':
        case '50n': return (
                        <FontAwesomeIcon icon={faSmog} />
                    );
                    
    }
}

export default weatherIcon