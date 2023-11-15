import {Text,StyleSheet,View} from 'react-native';


export default function Time({time}){
    const transformHours=()=>{
        const convertedValue= Math.floor((time / 3600000) % 24);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }
    const transformMinutes=()=>{
        const convertedValue= Math.floor((time / 60000) % 60);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }
    const transformSeconds=()=>{
        const convertedValue= Math.floor((time / 1000) % 60);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }
    const transformMilliseconds=()=>{
        const convertedValue= Math.floor((time) % 100);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }
    return(
        <View style={styles.row}>

            <Text style={styles.marking}>
                <Text>  Hours            Minutes       Seconds      Milliseconds</Text>
            </Text>
            <Text style={styles.time}>
                {transformHours()}  :
                <Text> </Text>{transformMinutes()} :
                <Text> </Text>{transformSeconds()} .
                <Text> </Text>{transformMilliseconds()}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    row:{
        display:'flex',
    },
    time:{
        fontSize:48,
        fontWeight:'bold',
        color:'#272727'
    },
    marking:{
        color: 'lightcyan',
        fontSize:   15,
        fontFamily: 'NiceTango-K7XYo'
    }
})