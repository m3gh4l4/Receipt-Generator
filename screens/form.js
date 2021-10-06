import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView,Button, Image,BackHandler } from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Cell, Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import EntryModal from './entryModal';

const Form =  ({navigation}) => {

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [date, setDate] = useState(new Date())
    const [istDate,setIstDate] = useState("DD/MM/YYYY")
    const [time,setTime] = useState('hh:mm')
    const [open, setOpen] = useState(false)
    const [total,setTotal] = useState(0)

    const[itemName,setItemName] = useState("")
    const[totDisc,setTotDisc] = useState(0)
    const[totGST,setTotGST] = useState(0)
    const [mainArr,setMainArr] = useState([])

    const[openModal,setOpenModal] = useState(false)
    
    const [submit,setSubmit] = useState(false)
    const[err1,setErr1] = useState(false)
    const[err2,setErr2] = useState(false)
    const[err3,setErr3] = useState(false)
    const[valid,setValid] = useState(false)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const updateData = (val) => {

        console.log("updating data")

        const id = [mainArr.length+1]
        val = id.concat(val)
        setMainArr(oldArr => [...oldArr,val])
        setTotal(total+parseInt(val[5],10))
        setTotGST(totGST+val[3])
    }

    useEffect(() => {
        if(phone.length>10)
            setValid(true)
        else{
            setValid(false)
        }
        
    }, [phone])

    const onSubmit = () => {
        if(name == ""){
            setErr1(true)
        }
        else{
            setErr1(false)
            if(phone==""){
                setErr2(true)
            }
            else{
                if(phone.length!=10){
                    setValid(true)
                }
                else{
                    setValid(false)
                    setErr2(false)
                    if(istDate=='DD/MM/YYYY'){
                        setErr3(true)
                    }
                    else{
                        setErr3(false)
                        navigation.navigate('Receipt', {
                            data:mainArr,
                            total:total,
                            gst:totGST,
                            name:name,
                            phone:phone,
                            time:time,
                            date : istDate
                        })
                    }
                }
            }
        }
    }

    let titleRow = ["Id", "Item Name", "Price Per Qyt", "Disc.", "GST", "Total"]
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Enter the details</Text>

            <View style={styles.inputWrapper}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Full Name</Text>
                </View>
                <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="" maxLength={30} />
            </View>
            {err1 ? <Text style={styles.error}>Oops!! you forgot to enter name</Text> : null}
            <View style={styles.inputWrapper}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Contact Number</Text>
                </View>
                <TextInput style={styles.input} onChangeText={setPhone} value={phone} placeholder="" keyboardType={'numeric'}  />
            </View>
            {err2 ? <Text style={styles.error}>Oops!! you forgot to enter phone number</Text> : valid ? <Text style={styles.error}>Please enter a valid phone number</Text> : null}

            <View style={styles.dateAndTime}>
                <View style={styles.labelWrapper,{alignSelf:'flex-start', }}>
                    <Text style={styles.label}>Date & Time</Text>
                </View>
                <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.6}>
                    <Image source={require('../assets/calendar2.png')} width={24} height={24} style={styles.calendar}/>
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="datetime"
                    open={open}
                    date={date}
                    locale="en-IN"
                    onDateChange={setDate}
                    onConfirm={(date) => {
                        setOpen(false)
                        let temp = new Date(date).toLocaleString(undefined, {timeZone:'Asia/Kolkata'})
                        if(temp[11]!=' '){
                            setTime(temp.slice(11,16))
                        }else{
                            setTime(temp.slice(12,17))
                        }
                        let l = temp.length

                        let finalDate = ""
                        // day
                        if(temp[8] == ' ')
                            finalDate = '0'+finalDate + temp[9]+'/'
                        else
                            finalDate = finalDate + temp.slice(8,10) + '/'
                        // month
                        let month = temp.slice(4,7)
                        month == 'Jan' ? month = '01' : month == 'Feb' ? month = '02' : month == 'Mar' ? month = "03" : month == 'Apr' ? month='04' : 
                        month == 'May' ? month = '05' : month == 'Jun' ? month = '06' : month == 'Jul' ? month = '07' : month == 'Aug' ? month = '08':
                        month == 'Sep' ? month = '09' : month == 'Oct' ? month = '10' : month == 'Nov' ? month = '11' : month = '12'
                        finalDate = finalDate + month + '/'
                        // year
                        finalDate = finalDate+temp.slice(l-4,l)
                        
                        setIstDate(finalDate)
                        console.log(finalDate)
                        setDate(date)
                    }}
                    onCancel={()=>{
                        setOpen(false)
                    }}
                />
                <View style={styles.date}>
                    <Text style={{fontSize:12}}>{istDate}</Text>
                </View>
                <View style={styles.date}> 
                    <Text style={{fontSize:12}}>{time}</Text>
                </View>

            </View>
            {err3 ? <Text style={styles.error}>Oops!! you forgot to enter Date and Time</Text> : null}

            <View style={{flexDirection:'row',justifyContent:'space-around',  width:'100%',paddingVertical:10}}>
                <TouchableOpacity style={{width:'40%'}} onPress={() => setOpenModal(true)} activeOpacity={0.6}>
                    <View >
                        <Text style={styles.addItem}>+ Add an Item</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width:'40%'}}>
                    <Text style={styles.addItem}>Total : {total.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</Text>
                </View>
            </View>
                
            <ScrollView>
                <Table borderStyle={{flex:1,borderWidth:1,borderColor:'#2E7FAC'}}>
                    <Row data={titleRow} style={{backgroundColor:'#5D8EA9', }} flexArr={[0.5,2,1.5,1,1,1,1]} textStyle={{fontSize:10, fontWeight:'600',textAlign:'center', color:'white'}} />
                    {mainArr.map((rowData,index)=>(
                        <Row key={index} data={rowData} flexArr={[0.5,2,1.5,1,1,1,1]} textStyle={{fontSize:10, textAlign:'center', padding:2}} 
                        style={index%2 ? {backgroundColor:'#CAD4D9'} : null}
                        />
                    ))}
                </Table>
            </ScrollView>
                        
            <TouchableOpacity style={{ justifyContent:'center', flexDirection:'row', paddingVertical:10}} activeOpacity={0.6} onPress={() => onSubmit() }>
                <View style={{width:'40%'}}>
                    <Text style={styles.addItem}>Submit</Text>
                </View>
            </TouchableOpacity>
            
            <EntryModal open={openModal} hideModal={() => setOpenModal(false)} updateData={updateData} mainArr={mainArr} />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F6F6F6',
        padding:10
    },
    heading:{
        fontFamily: 'SF Pro Display',
        fontWeight:'bold',
        fontSize:16,
        padding:2,
        textAlign:'center',
        fontStyle:'italic'
    },
    inputWrapper:{
        flexDirection:'row',
        margin:5
    },
    labelWrapper:{
        justifyContent:'center',
        width:'50%',
    },
    label:{
        fontFamily: 'SF Pro Display',
		fontSize: 12,
        backgroundColor:'#E8E8E8',
        padding:10,
        borderRadius:8,
        marginRight:10
    },
    input: {
		fontFamily: 'SF Pro Display',
		fontSize: 12,
        borderRadius:8,
        borderWidth:1.5,
        borderColor:"#A8A8A8",
        height:40,
        width:'50%',
        flexShrink:2,
        alignSelf:'center'
	},
    calendar:{
        width:30,
        height:30,
        flexShrink:2,
        marginLeft:-10,
    },
    dateAndTime:{
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection:'row',
        flexWrap:'wrap',
        paddingVertical:5
    },
    date:{
        justifyContent:'center',
        padding:5,
        fontFamily: 'SF Pro Display',
		fontSize: 10,
        borderRadius:8,
        borderWidth:1.5,
        borderColor:"#A8A8A8",
        backgroundColor:'#C2C2C2'
    },
    addItem:{
        alignSelf:'auto',
        borderRadius:8,
        padding:5,
        backgroundColor:'#5D8EA9',
        textAlign:'center',
        opacity:0.9,
        fontSize:12
    },
    error:{
        fontFamily: 'SF Pro Display',
		fontSize: 10,
        color:'red',
        textAlign:'center'
    },
    
})

export default Form;