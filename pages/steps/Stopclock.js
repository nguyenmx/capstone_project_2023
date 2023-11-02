import {useState,useEffect} from 'react'
import {View,StyleSheet} from 'react-native';
import Controls from './Controls';
import Time from './Time';
export default function StopClock(){
    const [time,setTime]=useState(0);

    /* -1 => stopped, 0 => paused, 1 => playing */
    const [status,setStatus]=useState(-1)

    const reset=()=>{
        setTime(0);
    }
    const handleStart=()=>{
        setStatus(1);
    }
    const handlePause=()=>{
        setStatus(status===0?1:0);
    }
    const handleStop=()=>{
        setStatus(-1);
    }


    useEffect(()=>{
        let timerID;
        if(status===1){
            timerID = setInterval(()=>{
                setTime((time) => time + 10);
            },10)
        }else{
            clearInterval(timerID)
            if(status===-1)
            reset();
        }
        return ()=>{clearInterval(timerID)}
    },[status])


    return(
        <View style={styles.container}>
            <Time time={time} />
            <Controls
                status={status}
                handleStart={handleStart}
                handlePause={handlePause}
                handleStop={handleStop}
            />
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        width: '100%'
    },
})