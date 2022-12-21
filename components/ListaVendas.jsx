import { View, Text } from 'react-native'
import React from 'react'
import styles from './Styles'
import MainButton from './MainButton'

export default ({navigation}) => {
  return (<>
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Teste Titulo</Text>
    </View>
    <View style={styles.container}>
        <MainButton bgStyle={styles.mainButton} color='white'
            title='Consultar Vendas' onPress={() => navigation.navigate('Vendas', {name: 'Vendas'})} />

        <MainButton bgStyle={styles.mainButton} color='white'
            title='Fechamento mensal' />
    </View>
    <View style={{...styles.centralized, backgroundColor: 'white'}}>
        <MainButton bgStyle={styles.bottomButton} color='white'
            title='Nova Venda' />
    </View>
</>)
}