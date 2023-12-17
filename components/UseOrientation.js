import { Dimensions } from 'react-native'
import {useState, useEffect } from "react"

export default UseOrientation = () => {
    const [screenInfo, setScreenInfo] 
    = useState(Dimensions.get('screen'));

    useEffect(() => {
        const onChange = (result)=> {
            setScreenInfo(result.screen);
        }

        Dimensions.addEventListener('change', onChange);
        
        return () => Dimensions.removeEventListener('change', onChange);
    }, []);

    return {
        ...screenInfo,
        isPortrait: screenInfo.height > screenInfo.width
    }
}