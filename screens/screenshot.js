import React, { Component } from 'react'
import { View,Text } from 'react-native'
import ViewShot from 'react-native-view-shot'

class SS extends Component {

    componentDidMount () {
        this.refs.ViewShot.capture().then(uri => {
            console.log("do somethin with ", uri);
        });
    }

    render() {
        return (
            <View>
            <ViewShot ref="viewShot" options={{format:'jpg', quality:0.8}}>
                <Text>do something here</Text>
            </ViewShot>
                <Text>hsuih</Text>
            </View>
        )
    }
}

export default SS;