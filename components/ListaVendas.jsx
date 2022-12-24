import { View, TouchableWithoutFeedback, Text, TextInput, StyleSheet, Keyboard, Alert, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Styles';
import MainButton from './MainButton';

const data30Dias = new Date();

data30Dias.setDate(data30Dias.getDate() + 30);

export default ({ navigation }) => {
    const [dataInicioFiltro, setDataInicioFiltro] = useState(new Date());
    const [dataFimFiltro, setDataFimFiltro] = useState(data30Dias);
    const [listaVendas, setListaVendas] = useState([]);



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <ScrollView>
                <View style={{
                    ...styles.containerNewVenda,
                    alignItems: 'flex-start',
                    ...styles.marginTop
                }}>

                    <View style={stylesListaVenda.container}>
                        <Text style={{ fontSize: 15 }}>Data Inicio:</Text>
                        <Text style={{ fontSize: 15, marginLeft: 95 }}>Data Fim:</Text>

                    </View>
                    <View style={{
                        ...stylesListaVenda.container,
                        width: '100%'
                    }}>
                        <DateTimePicker mode='date'
                            value={dataInicioFiltro}
                            onChange={(ev) => setDataInicioFiltro(new Date(ev.nativeEvent.timestamp))} />

                        <DateTimePicker mode='date'
                            style={{ marginLeft: 50 }}
                            value={dataFimFiltro}
                            onChange={(ev) => setDataFimFiltro(new Date(ev.nativeEvent.timestamp))} />
                    </View>

                    <View style={{
                        ...stylesListaVenda.container,
                        flexDirection: 'column'
                    }}>
                        <Text style={{ fontSize: 15 }}>Cliente:</Text>
                        <TextInput style={{
                            ...stylesListaVenda.txtInput,
                            marginTop: 10
                        }}
                            placeholder='Nome do cliente'
                            onChangeText={(e) => {
                                setCurrProdutoNome(e);
                            }}></TextInput>
                    </View>

                    <MainButton title='Pesquisar' bgStyle={{
                        ...styles.mainButton,
                        alignSelf: 'center'
                    }} color='white' />


                    <DataTable style={{ marginTop: 30 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Data</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Cliente</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Valor</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Ação</DataTable.Title>
                        </DataTable.Header>
                        {listaVendas.map((el, i) => {
                            return (
                                <DataTable.Row style={{ marginTop: 10 }} key={el.CodVenda}>
                                    <DataTable.Cell style={styles.centralized}>{el.DataVenda}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{el.CodCliente}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{0.00}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>
                                        Açao
                                    </DataTable.Cell>
                                </DataTable.Row>
                            );
                        })}
                    </DataTable>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const stylesListaVenda = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'row',
    },
    txtInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        height: 30,
        fontSize: 17,
        width: 300
    },
});