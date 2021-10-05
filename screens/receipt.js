import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView,  } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import ViewShot, { captureRef } from 'react-native-view-shot';

const Receipt = ({route,navigation}) => {

    class ExampleCaptureOnMountManually extends Component {
        componentDidMount () {
          this.refs.viewShot.capture().then(uri => {
            console.log("do something with ", uri);
          });
        }
        render() {
          return (
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
              <Text>...Something to rasterize...</Text>
            </ViewShot>
          );
        }
    }
    
    let date = route.params.date
    let totDiscount = route.params.disc
    let totGST = route.params.gst
    let total = route.params.total + totDiscount - totGST
    let titleRow = ["Id", "Item Name", "Price Per Quant.", "Disc.", "GST", "Total"]
    
    
    // captureRef(viewRef, {
    //     format: "jpg",
    //     quality: 0.8
    //   }).then(
    //     uri => console.log("Image saved to", uri),
    //     error => console.error("Oops, snapshot failed", error)
    //   );

    useEffect(() => {
        viewShot.capture().then(uri => {
            console.log("do something with ", uri);
          });
        
    }, [])
    const oncapture = (uri) => {
        console.log("image is saved to ", uri)
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingLeft:5}}>
                <View style={styles.receipt}>
                    <View style={{paddingTop:10, flexDirection:'row', justifyContent:'center'}}>
                        <Image source={require('../assets/header.png')} />
                    </View>
                    <Text style={styles.shop}>ABC SUPER MARKET</Text>
                    <Text style={styles.detailsHeading}>Customer Details: </Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailsWrapper}>
                            <View style={{alignSelf:'center', paddingRight:10}}>
                                <Text style={[styles.subTitle, {fontWeight:'600'}]}>NAME</Text>
                                <Text style={[styles.subTitle, {fontWeight:'600'}]}>CONTACT</Text>
                            </View>
                            <View style={{alignSelf:'center'}}>
                                <Text style={styles.subTitle}>: {route.params.name}</Text>
                                <Text style={styles.subTitle}>: {route.params.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.detailsWrapper}>
                            <View style={{alignSelf:'center', paddingRight:10}}>
                                <Text style={[styles.subTitle, {fontWeight:'600'}]}>DATE</Text>
                                <Text style={[styles.subTitle, {fontWeight:'600'}]}>TIME</Text>
                            </View>
                            <View style={{alignSelf:'center'}}>
                                <Text style={styles.subTitle}>: {date.slice(1,5)}/{date.slice(6,8)}/{date.slice(9,11)}</Text>
                                <Text style={styles.subTitle}>: {date.slice(12,17)}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <Table borderStyle={{borderWidth:1,borderColor:'black'}}>
                        <Row data={titleRow} style={{backgroundColor:'#E5E5E1', }} flexArr={[0.5,2.5,1.5,1,1,1.5]} textStyle={{fontSize:10, fontWeight:'600',textAlign:'center', }} />
                        {route.params.data.map((rowData,index)=>(
                            <Row key={index} data={rowData} flexArr={[0.5,2.5,1.5,1,1,1.5]} textStyle={{fontSize:10, textAlign:'center', padding:2}} 
                            style={index%2 ? {backgroundColor:'#E5E5E1'} : null}
                            />
                            ))}
                    </Table>
                    <View style={{flexDirection:'row',paddingVertical:10, justifyContent:'space-between', paddingHorizontal:5 }}>
                        <View style={{flexDirection:'column', justifyContent:'space-between',width:'50%'}}>
                            <View>
                                <Text style={styles.thanks}>THANK YOU FOR SHOPPING!!</Text>
                                {/* <Image source={require('../assets/thanks_black.png')} style={{}} /> */}
                            </View>
                            <View style={{paddingTop:10}}>
                                <Text style={styles.address}>Phone   : +91 8983375864</Text>
                                <Text style={styles.address}>Address : 123,main stree, near triveni school, 508192</Text>
                                <Text style={styles.address}>email   : mailhere@gmail.com</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{paddingRight:5}}>
                                <Text style={styles.totals}>Total </Text>
                                <Text style={styles.totals}>Total Disc.</Text>
                                <Text style={styles.totals}>Total GST</Text>
                                <Text style={styles.totals}>Grand Total</Text>
                            </View>
                            <View>
                                <Text style={styles.totVal}>: {total}</Text>
                                <Text style={styles.totVal}>: {totDiscount}</Text>
                                <Text style={styles.totVal}>: {totGST}</Text>
                                <Text style={styles.totVal}>: {total+totGST-totDiscount}</Text>

                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View>
                        <Text style={styles.bntText}>Edit the details</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Form')}>
                    <View style={{paddingVertical:10}}>
                        <Text style={styles.bntText}>Generate another receipt</Text>
                    </View>
                </TouchableOpacity>
                <ViewShot ref="viewShot">
                    <View style={{justifyContent:'center',alignItems:'center',}}>
                        <Text style={{backgroundColor:'skyblue', padding:5}}>Heyy!! Screen shot me</Text>
                    </View>
                </ViewShot>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F6F6F6',
        // alignItems:'center',
        // justifyContent:'space-evenly'
    },
    receipt:{
        width:'98%',
        borderWidth:1.5,
        borderColor:'black',
        marginVertical:10,
        justifyContent:'center',
        paddingHorizontal:5
        // backgroundColor:'#F5F5E2'

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
        padding:5

    },
    subTitle:{
        fontSize:10,
        // fontWeight:'bold'
    },
    detailsWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:5
    },
    detailsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10
    },
    totals:{
        fontFamily: 'SF Pro Display',
        fontSize:12,
        fontWeight:'bold',
        color:'black',
        alignSelf:'flex-end'
    },
    totVal:{
        fontFamily: 'SF Pro Display',
        fontSize:12,
        fontWeight:'bold',
        alignSelf:'flex-start'
    },
    address:{
        fontFamily: 'SF Pro Display',
        fontSize:10,
        
    },
    thanks:{
        fontFamily: 'SF Pro Display',
        fontSize:12,
        fontWeight:'bold'
    },
    bntText:{
        fontFamily: 'SF Pro Display',
        borderRadius: 8,
        fontSize: 14,
        fontWeight:'bold',
        borderWidth:1.5,
        padding:5,
        textAlign:'center',
        alignSelf:'center',
        backgroundColor:'#5D8EA9',
        opacity:0.8

    },
})
export default Receipt;