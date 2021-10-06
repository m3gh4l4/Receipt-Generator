import React, { Component, useRef, useState } from 'react'
import { View,Text, TouchableOpacity,Image } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'

const SS = ({navigation}) => {
    const viewShotRef = useRef()
    const[uri,setUri] = useState('')
    
    // const onCapture = async ()  => {
    //     try{
    //         const result = await captureRef(viewShotRef, {
    //             quality=1,
    //             format="jpg",
    //             result="tmpfile"
    //         });
    //         MediaLibrary.saveToLibraryAsync(result);
    //     }
    //     catch(e) {
    //         console.log("error ->   " + e)
    //     }
    // }
    // captureRef(viewShotRef, {
    //     format="jpg",
    //     quality=0.8,
    //     result="tmpfile"
    // })
    const onCapture = async () => {
        const uri = await viewShotRef.current.capture();
        setUri(uri);
        console.log("do something with this uri ->" + uri);
    };
    return(
        <View>
            <ViewShot ref={viewShotRef}>
                <View >
                    <Text style={{fontSize:12, padding:10, borderRadius:10, backgroundColor:'skyblue'}}>Heyy there!! can u capure me</Text>
                </View>

            </ViewShot>
            <TouchableOpacity onPress={() => onCapture()}>
                <Text style={{fontSize:12, padding:10, borderRadius:10, backgroundColor:'pink'}}>capture</Text>
                <Image uri={uri} width={40} height={40} style={{borderWidth:10}}/>
            </TouchableOpacity>
        </View>
    )

}
export default SS;