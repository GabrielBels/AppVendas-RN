import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'

export default (props) => {
    return (
        <View style={props.bgStyle}>
            <Button  color={props.color ?? 'black'}
                title={props.title ?? ''}
                onPress={props.onPress}
                ref={props.refItem ?? null} />
        </View>
    )
}