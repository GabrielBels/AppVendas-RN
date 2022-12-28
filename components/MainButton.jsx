import { Pressable, Text, View } from 'react-native'
import React from 'react'

export default (props) => {
    return (
        <Pressable
            style={props.bgStyle}
            onPress={props.onPress}
            ref={props.refItem ?? null}>
            <Text style={{ color: 'white', fontSize: 17 }}>{props.title ?? ''}</Text>
        </Pressable>
    )
}