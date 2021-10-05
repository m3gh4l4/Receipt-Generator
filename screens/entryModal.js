import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'

const EntryModal = (props) => {

    const[subData,setSubData] = useState([])
    const[data,setData] = useState([])

    const [itemName,setItemName] = useState("")
    const[quantity,setQuantity] = useState("")
    const[price,setPrice] = useState("")
    const[discount,setDiscount] = useState("")
    const[gst,setGst] = useState("")
    const[subTot,setSubTot] = useState("")

    const [done,setDone] = useState(false)
    const [cancel,setCancel] = useState(false)

    const [err1,setErr1] = useState(false)
    const [err2,setErr2] = useState(false)
    const [err3,setErr3] = useState(false)
    
    const[refresh,setRefresh] = useState(false)
    const resetStates = () => {
    
        setItemName("");
        setQuantity("")
        setPrice("")
        setGst("")
        setDiscount("")
        setSubTot("")
        setErr3(false)
        setErr1(false)
        setErr2(false)
        setDone(false)
        setCancel(false)
    }
    
    useEffect(() => {
        if(props.editId)
        setRefresh(!refresh)
        let id = props.editId
        let mainArr = props.mainArr
        if(props.editId!=-1){
            let l = mainArr[id][1].length;
            
            console.log(id + "-----------")
            setItemName(mainArr[id][1].slice(0,l-4))
            setQuantity(mainArr[id][1].slice(l-2,l-1))
            setPrice(String(mainArr[id][2]))
            setDiscount(String(mainArr[id][3]))
            setGst(String(mainArr[id][4]))
            setSubTot(String(mainArr[id][4]))
            setErr3(false)
            setErr1(false)
            setErr2(false)
            setDone(false)
            setCancel(false)
            
        }
        else{
            resetStates()
        }
    }, [cancel,done])
    useEffect(() => {
        
    }, [refresh])
    const handleCancel = () => {
        props.hideModal();
        setCancel(true);
        setDone(false)
    }
    const handleDone = () => {
        if(itemName == ""){
            setErr1(true)
        }
        else{
            setErr1(false)
            if(quantity==""){
                setErr2(true)
            }
            else{
                setErr2(false)
                if(price == ""){
                    setErr3(true)
                }
                else{
                    setErr3(false)
                    if(!isNaN(quantity) && !isNaN(price) && !isNaN(discount) && !isNaN(gst)){
                        if(discount==""){
                            setDiscount("0")
                        }
                        if(gst==""){
                            setGst("0")
                        }
                        const quant =itemName+ " (" + quantity + ")";
                        let dupDisc = discount=="" ? 0 : parseInt(discount,10)
                        let dupGST = gst == "" ? 0 : parseInt(gst,10)
                        const temp = [];
                        temp.push(quant);
                        temp.push(price);
                        temp.push(dupDisc);
                        temp.push(dupGST);
                        setSubData(temp);
                        
                        let tot = parseInt(quantity,10) * parseInt(price,10) - dupDisc + dupGST;
                        temp.push(tot);
                        if(props.editId!=-1){
                            props.editData(temp,props.editId)
                        }
                        else{
                            props.updateData(temp,tot)
                        }
                        
                        props.hideModal()
                        resetStates()

                    }
                }
            }
        }
    }
    return(
        <Modal
        visible={props.open}
        animationType='fade' 
        transparent={true} 
        onRequestClose={() => props.hideModal()} 
        >
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.heading}>Enter Item Detials</Text>

                    <TextInput  onChangeText={setItemName} value={itemName} placeholder="Item Name" style={styles.input}/>
                    {err1 ? <Text style={styles.error}>Oops!! you forgot to enter Item name</Text> : null}
                    
                    <TextInput  placeholder="Quantity"  onChangeText={setQuantity} value={quantity} style={styles.input} keyboardType="numeric" />
                    { err2 ? <Text style={styles.error}>Oops!! you forgot to enter quantity</Text> : isNaN(quantity) ? <Text style={styles.error}>Please enter a number</Text> : null}
                    <TextInput onChangeText={setPrice} value={price} placeholder="Price Per Quantity" style={styles.input} keyboardType="numeric" />
                    {err3 ? <Text style={styles.error}>Oops!! you forgot to enter price per quantity</Text> : isNaN(price) ? <Text style={styles.error}>Please enter a number</Text> : null }
                    <TextInput onChangeText={setDiscount} value={discount} placeholder="Discount (excluding GST)" style={styles.input} keyboardType="numeric" />
                    {isNaN(discount) ? <Text style={styles.error}>Please enter a number</Text> : null}
                    <TextInput onChangeText={setGst} value={gst} placeholder="GST" style={styles.input} keyboardType="numeric" />
                    {isNaN(gst) ? <Text style={styles.error}>Please enter a number</Text> : null}
                    <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center', }}>
                        <TouchableOpacity style={{justifyContent:'center', flexDirection:'row', marginTop:10 }} onPress={() => handleCancel()} activeOpacity={0.7}>
                            <View style={{alignSelf:'center', width:'60%'}}>
                                <Text style={[styles.addItem, {paddingHorizontal:10,backgroundColor:'red'}]}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center', flexDirection:'row', marginTop:10 }} onPress={() => handleDone()} activeOpacity={0.7}>
                            <View style={{alignSelf:'center', width:'60%'}}>
                                <Text style={[styles.addItem, {paddingHorizontal:10,backgroundColor:'green'}]}> Done </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#0008",
    },
    wrapper:{
        backgroundColor:'white',
        borderRadius:12,
        borderWidth:2,
        borderColor:"#A8A8A8",
        padding:20,
        alignSelf:'center',
        width:'80%',
        margin:5
    },
    heading:{
        fontFamily: 'SF Pro Display',
		fontSize: 14,
        fontWeight:'bold',
        textAlign:'center',
        textTransform:'uppercase',
        padding:5,
    },
    input:{
        fontFamily: 'SF Pro Display',
		fontSize: 12,
        borderWidth:2,
        height:40,
        padding:5,
        margin:5,
        borderRadius:8
    },
    addItem:{
        alignSelf:'auto',
        borderRadius:8,
        padding:5,
        backgroundColor:'#E8E8E8',
        backgroundColor:'#5D8EA9',
        textAlign:'center',
        opacity:0.7,
        fontWeight:'800'
    },
    error:{
        fontFamily: 'SF Pro Display',
		fontSize: 10,
        color:'red',
        textAlign:'center'
    },
    total:{
        fontFamily: 'SF Pro Display',
		fontSize: 14,
        textAlign:'right',
        fontWeight:'bold'
    }
})
export default EntryModal;