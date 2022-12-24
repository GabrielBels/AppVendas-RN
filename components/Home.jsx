import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react'
import styles from './Styles'
import MainButton from './MainButton';

import { Context } from './ContextProvider';

export default ({ navigation }) => {
    const {empresaNome} = useContext(Context);

    return (<>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{empresaNome}</Text>
            </View>
            <View style={styles.container}>
                <MainButton bgStyle={styles.mainButton} color='white'
                    title='Consultar Vendas' onPress={() => navigation.navigate('Lista Vendas', { name: 'ListaVendas' })} />
            </View>

            <View style={{ ...styles.centralized, backgroundColor: 'white' }}>
                <MainButton bgStyle={styles.bottomButton} color='white'
                    title='Nova Venda'
                    onPress={() => navigation.navigate('Nova Venda', { name: 'Nova Venda' })}>

                </MainButton>
            </View>
            <StatusBar style="auto" />
    </>)
}