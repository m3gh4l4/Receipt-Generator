import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, BackHandler,  } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Row, Rows, Table } from 'react-native-table-component';

const Receipt = ({route,navigation}) => {

    let totGST = route.params.gst
    let total = route.params.total 
    let titleRow = ["Id", "Item Name", "Price Per Qyt", "Disc.", "GST", "Total"]
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])
    const editAction = [
        {
            text:'Edit',
            icon : require('../assets/edit.png'),
            name: 'editBtn',
            position:1,
        }
    ]
    const newAction = [
        {
            text:'New',
            name:'newButton',
            icon:require('../assets/plus.png'),
            position:1,
        }
    ]
    return(
        <SafeAreaView style={styles.container} >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:5, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <View style={styles.receipt}>
                    <View style={{paddingTop:10, flexDirection:'row', justifyContent:'center'}}>
                        <Image source={require('../assets/header.png')} />
                    </View>
                    <Text style={styles.shop}>ABC SUPER MARKET</Text>
                    <View>
                        <Text style={styles.detailsHeading}>Customer Details: </Text>
                    </View>
                    <View style={{alignItems:'center', width:'80%',alignSelf:'center',padding:10 }}>
                        <View style={{flexDirection:'row' }}>
                            <Text style={styles.subTitle}>Customer Name </Text>
                            <Text style={styles.subTitleVal}>: {route.params.name}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.subTitle}>Customer Phone Number </Text>
                            <Text style={styles.subTitleVal}>: {route.params.phone}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.subTitle}>DATE  </Text>
                            <Text style={styles.subTitleVal}>:  {route.params.date} & </Text>
                            <Text style={styles.subTitle}>TIME  </Text>
                            <Text style={styles.subTitleVal}>:  {route.params.time}</Text>
                        </View>
                    </View>
                    
                    <Table borderStyle={{borderWidth:1,borderColor:'black'}}>
                        <Row data={titleRow} style={{backgroundColor:'dimgrey', }} flexArr={[0.5,2.5,1.5,1,1,1.5]} textStyle={{fontSize:10, fontWeight:'600',textAlign:'center',color:'white' }} />
                        {route.params.data.map((rowData,index)=>(
                            <Row key={index} data={rowData} flexArr={[0.5,2.5,1.5,1,1,1.5]} textStyle={{fontSize:10, textAlign:'center', padding:2}} 
                            style={index%2 ? {backgroundColor:'darkgrey'} : null}
                            />
                            ))}
                    </Table>

                    <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingVertical:10}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.totals}>Sub Total </Text>
                            <Text style={styles.totals}>Total GST</Text>
                            <Text style={[styles.totals,{fontSize:14}]}>Total</Text>
                        </View>
                        <View style={{justifyContent:'center', }}>
                            <Text style={styles.totVal}>: {'\u20B9'} {(total-totGST).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')} </Text>
                            <Text style={styles.totVal}>: {'\u20B9'} {totGST.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</Text>
                            <Text style={styles.totVal}>: {'\u20B9'} {total.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</Text>

                        </View>
                    </View>

                    <View style={{ justifyContent:'center',alignItems:'center' }}>
                        <Text style={styles.thanks}>THANK YOU FOR SHOPPING!!</Text>
                        <View style={{alignSelf:'center', paddingVertical:5, justifyContent:'center', alignItems:'center'}}>
                            <Text style={styles.address}>Address : 123,main stree, near triveni school, 508192</Text>
                            <Text style={styles.address}>email   : mailhere@gmail.com</Text>
                            <Text style={styles.address}>Phone   : +91 8983375864</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <FloatingAction 
                actions={editAction}
                onPressItem={(name) => {
                    navigation.goBack()
                    console.log("pressed " + name)
                }}
                color={"#5D8EA9"}
                overrideWithAction={true}
                buttonSize={40}
                distanceToEdge={{vertical:20, horizontal:100}}
            />
            <FloatingAction 
                actions={newAction}
                onPressItem={(name) => {
                    navigation.push('Form')
                    console.log("pressed " + name)
                }}
                color={"#5D8EA9"}
                overrideWithAction={true}
                buttonSize={40}
                distanceToEdge={{vertical:20,horizontal:40}}
            />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F6F6F6',
        justifyContent:'center'
    },
    receipt:{
        width:'98%',
        borderWidth:3,
        borderColor:'black',
        marginVertical:10,
        justifyContent:'center',
        paddingHorizontal:5

    },
    header:{
        fontFamily:'salsa'
    },
    shop:{
        fontSize:14,
        textAlign:'center',
        fontWeight:'700',
        borderBottomColor:'black',
        borderBottomWidth:1.5,
        color:'black',
        padding:5,
        marginHorizontal:5
    },
    detailsHeading:{
        fontWeight:'bold',
        fontFamily: 'SF Pro Display',
        color:'black',
        fontSize:12,
        paddingTop:5,
        alignSelf:'center'

    },
    subTitle:{
        fontSize:10,
        fontWeight:'bold'
    },
    subTitleVal:{
        fontSize:10
    },
    detailsContainer:{
        flex:1,
        flexDirection:'row',
        paddingBottom:10,
        flexWrap:'wrap',
        flexShrink:2
    },
    detailsWrapper:{
        paddingHorizontal:5,
        justifyContent:'center'
    },
    totals:{
        fontFamily: 'SF Pro Display',
        fontSize:12,
        fontWeight:'bold',
        color:'black',
        alignSelf:'flex-start',
        paddingHorizontal:10
    },
    totVal:{
        fontFamily: 'SF Pro Display',
        fontSize:12,
        fontWeight:'bold',
        alignSelf:'flex-start',
        paddingHorizontal:10
    },
    address:{
        fontFamily: 'SF Pro Display',
        fontSize:10,
        
    },
    thanks:{
        fontFamily: 'SF Pro Display',
        fontSize:14,
        fontWeight:'bold',
        fontStyle:'italic',
        borderBottomWidth:1.5,
        width:'95%',
        paddingBottom:5,
        textAlign:'center'
    },
    bntText:{
        fontFamily: 'SF Pro Display',
        borderRadius: 8,
        fontSize: 12,
        padding:5,
        textAlign:'center',
        alignSelf:'center',
        backgroundColor:'#5D8EA9',
        opacity:0.8

    },
})
export default Receipt;