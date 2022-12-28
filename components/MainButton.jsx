import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'

export default (props) => {
    return (
        <View style={props.bgStyle}>
            <Button color={props.color ?? '#d0557a'}
                title={props.title ?? ''}
                onPress={props.onPress}
                ref={props.refItem ?? null} style={
                    {
                        borderRadius: 0,
                        borderColor: 'none',
                        boxShadow: 'none',
                        backgroundColor: 'transparent'
                    }} />
        </View>
    )
}