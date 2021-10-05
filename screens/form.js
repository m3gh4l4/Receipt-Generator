import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView,Button, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Cell, Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import EntryModal from './entryModal';

const Form =  ({navigation}) => {

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [total,setTotal] = useState(0)

    const[itemName,setItemName] = useState("")
    const[totDisc,setTotDisc] = useState(0)
    const[totGST,setTotGST] = useState(0)

    const [mainArr,setMainArr] = useState([])
    const [edit,setEdit] = useState(false)
    const[editId,setEditId] = useState(-1)
    

    const[openModal,setOpenModal] = useState(false)
    
    const [submit,setSubmit] = useState(false)
    const[err1,setErr1] = useState(false)
    const[err2,setErr2] = useState(false)
    const[valid,setValid] = useState(false)

    
    const handleEdit = (id) => {

        console.log("clicked edit button")
        setEdit(true)
        setEditId(id);
        console.log(id +"   edit id " + editId);
    }

    useEffect(() => {
        if(editId!=-1 && edit===true){
            console.log(editId) + "========"
            setOpenModal(true)
        }
    }, [setEditId,edit])
    const editData = (newData,id) => {

        console.log("editing data")
        let dupData = mainArr;
        for(let i=0;i<5;i++){
            dupData[id][i+1] = newData[i]
            console.log(newData[i] + "....")
        }
        setMainArr(dupData)
    }

    const EditBtn = (id) => {        
        return(
            <TouchableOpacity onPress={() => handleEdit(id)}>
                <View style={styles.editWrapper}>
                    <Text style={styles.editText}>edit</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    const handleAddItem = () => {

        console.log("clicked add item")
        setEdit(false); 
        setEditId(-1); 
        setOpenModal(true);
    }
    
    const updateData = (val,tot) => {

        console.log("updating data")

        const id = [mainArr.length+1]
        val = id.concat(val)
        // const newCol = [EditBtn(mainArr.length)]
        // val = val.concat(newCol)
        setMainArr(oldArr => [...oldArr,val])
        setTotal(total+tot)
        setTotGST(totGST+val[3])
        setTotDisc(totDisc+val[2])
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
                    navigation.navigate('Receipt', {
                        data:mainArr,
                        total:total,
                        disc:totDisc,
                        gst:totGST,
                        name:name,
                        phone:phone,
                        date:JSON.stringify(date)
                    })
                }
            }
        }
    }

    let titleRow = ["Id", "Item Name", "Price Per Quant.", "Disc.", "GST", "Total",""]
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Enter the details</Text>

            <View style={styles.inputWrapper}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Full Name</Text>
                </View>
                <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="" />
            </View>
            {err1 ? <Text style={styles.error}>Oops!! you forgot to enter name</Text> : null}
            <View style={styles.inputWrapper}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Contact Number</Text>
                </View>
                <TextInput style={styles.input} onChangeText={setPhone} value={phone} placeholder="" keyboardType={'numeric'} />
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
                        setDate(date)
                    }}
                    onCancel={()=>{
                        setOpen(false)
                    }}
                />
                <View style={styles.date}>
                    <Text>{JSON.stringify(date).slice(1,5)}/{JSON.stringify(date).slice(6,8)}/{JSON.stringify(date).slice(9,11)}</Text>
                </View>
                <View style={styles.date}> 
                    <Text>{ JSON.stringify(date).slice(12,17)}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-around',  width:'100%',paddingVertical:10}}>
                <TouchableOpacity style={{width:'40%'}} onPress={() =>handleAddItem()} activeOpacity={0.6}>
                    <View >
                        <Text style={styles.addItem}>+ Add an Item</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width:'40%'}}>
                    <Text style={styles.addItem}>Total : {total}</Text>
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
            
            <EntryModal open={openModal} hideModal={() => setOpenModal(false)} updateData={updateData} editData={editData} editId = {editId} mainArr={mainArr} edit={edit}  />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingHorizontal:10,
        backgroundColor:'#F6F6F6'
    },
    heading:{
        fontFamily: 'SF Pro Display',
        fontWeight:'bold',
        fontSize:22,
        padding:2,
        textAlign:'center',
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
		fontSize: 12,
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
        opacity:0.9
    },
    error:{
        fontFamily: 'SF Pro Display',
		fontSize: 10,
        color:'red',
        textAlign:'center'
    },
    editWrapper:{
        alignSelf:'center'
    },
    editText:{
        backgroundColor:'#5D8EA9',
        fontSize:10,
        borderRadius:5,
        paddingHorizontal:5,
        width:'100%',
        color:'white'
        
    }
})

export default Form;