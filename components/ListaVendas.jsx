import { View, TouchableWithoutFeedback, Text, TextInput, StyleSheet, Keyboard, Alert, ScrollView, TouchableHighlight } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Styles';
import MainButton from './MainButton';

import { Context } from './ContextProvider';

const data30Dias = new Date();
data30Dias.setDate(data30Dias.getDate() + 20);
data30Dias.setHours(23, 59, 59);

const dataAtual = new Date();
dataAtual.setDate(dataAtual.getDate() - 10);
dataAtual.setHours(0,0,0);

export default ({ navigation }) => {
    const [dataInicioFiltro, setDataInicioFiltro] = useState(dataAtual);
    const [dataFimFiltro, setDataFimFiltro] = useState(data30Dias);
    const [nomeClienteBuscado, setNomeClienteBuscado] = useState("");
    const [listaVendas, setListaVendas] = useState([]);
    const [valorTotalRetornado, setValorTotalRetornado] = useState(0);

    const { urlApi } = useContext(Context);

    useEffect(() => {
        getVendas(dataInicioFiltro.getTime(), dataFimFiltro.getTime());
    }, []);

    useEffect(() => {
        
        if (!listaVendas || listaVendas.length == 0) {
            setValorTotalRetornado(0);
            return;
        }

        const valorTotal = listaVendas.reduce((acc, curr) => {
            acc += curr.ValorTotalVenda ?? 0;
            return acc;
        }, 0);

        setValorTotalRetornado(valorTotal.toFixed(2));
    }, [listaVendas])

    function getVendas(dataInicio, dataFim, nomeCliente) {
        const baseUrl = `${urlApi}Venda?`;

        let urlParams = [];

        if (dataInicio) urlParams.push(`dataInicio=${dataInicio}`);
        if (dataFim) urlParams.push(`dataFim=${dataFim}`);
        if (nomeCliente) urlParams.push(`nomeCliente=${nomeCliente}`);

        fetch(baseUrl + urlParams.join("&"))
            .then(result => result.json())
            .then((result) => {
                setListaVendas(result["data"]);
            })
            .catch((error) => {
                Alert.alert("Erro ao consultar as vendas: " + error)
            });
    }

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
                                setNomeClienteBuscado(e);
                            }}></TextInput>
                    </View>

                    <MainButton title='Pesquisar' bgStyle={{
                        ...styles.mainButton,
                        alignSelf: 'center'
                    }}
                        onPress={() => {
                            const dataInicioDia = new Date(dataInicioFiltro.getFullYear(), dataInicioFiltro.getMonth(), dataInicioFiltro.getDate(), 0, 0, 0);
                            const dataFimDia = new Date(dataFimFiltro.getFullYear(), dataFimFiltro.getMonth(), dataFimFiltro.getDate(), 23, 59, 59);

                            getVendas(dataInicioDia.getTime(), dataFimDia.getTime(), nomeClienteBuscado)
                        }}
                        color='white' />

                    <View style={{
                        ...stylesListaVenda.container,
                        flexDirection: 'column'
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: R$ {valorTotalRetornado}</Text>
                      
                    </View>

                    <DataTable style={{ marginTop: 30 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Data</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Cliente</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Valor</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Ação</DataTable.Title>
                        </DataTable.Header>
                        {listaVendas.map((el, i) => {
                            const dataVenda = new Date(parseInt(el.DataVenda));

                            return (
                                <TouchableHighlight key={el.CodVenda}
                                    onPress={() => {

                                        navigation.navigate('Detalhes Venda', {
                                            name: 'Detalhes Venda',
                                            codVenda: el.CodVenda
                                        })
                                    }}>
                                    <DataTable.Row style={{ marginTop: 10 }} >
                                        <DataTable.Cell style={styles.centralized}>{dataVenda.toLocaleDateString("pt-BR")}</DataTable.Cell>
                                        <DataTable.Cell style={styles.centralized}>{el.Nome}</DataTable.Cell>
                                        <DataTable.Cell style={styles.centralized}>{parseFloat(el.ValorTotalVenda).toFixed(2)}</DataTable.Cell>
                                    </DataTable.Row>
                                </TouchableHighlight>
                            );
                        })}
                    </DataTable>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
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
    fontSize: {
        fontSize: 100
    }
});