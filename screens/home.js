import React from 'react'
import {useEffect} from 'react'
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


const Home = ({navigation}) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => false
    }, [])
    return(
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <LinearGradient
            useAngle={true}
            angle={45}
            angleCenter={{x:1,y:0}}
            colors={['#2E7FAC', '#FFF']}
            style={{width:'100%', height:'100%', justifyContent:'center',alignItems:'center'}}
            >
                <View style={{flexDirection:'row',height:'30%', width:'100%',justifyContent:'space-evenly',alignItems:'center'}} >
                    <Image source={require('../assets/receipt1.png')} style={{ alignSelf:'flex-end'}}/>
                    <Image source={require('../assets/shop1.png')} style={{ alignSelf:'flex-start'}}/>
                    <Image source={require('../assets/laptop1.png')} style={{ alignSelf:'flex-end'}}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Form')} activeOpacity={0.6}>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>+ Generate a Receipt</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',height:'30%',width:'100%',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Image source={require('../assets/shopping-cart1.png')} style={{ alignSelf:'flex-start'}}/>
                    <Image source={require('../assets/online-shopping1.png')} style={{ alignSelf:'flex-end'}}/>
                    <Image source={require('../assets/invoice1.png')} style={{ alignSelf:'flex-start'}}/>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnContainer:{
        borderRadius: 8,
        fontSize: 18,
        padding: 8,
        marginVertical:20
    },
    btnText:{
        fontFamily: 'SF Pro Display',
        fontWeight:'800',
        color:'white',
        fontSize:18,
        borderWidth:1.5,
        borderRadius:10,
        borderColor:'#FFF8',
        padding:10
    }
})
export default Home;