import { View, TouchableWithoutFeedback, Text, TextInput, StyleSheet, Keyboard, Alert, ScrollView, TouchableHighlight } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { DataTable } from 'react-native-paper';
import styles from './Styles';

import { Context } from './ContextProvider';

export default ({ route, navigation }) => {
    const [dadosVenda, setDadosVenda] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const { urlApi } = useContext(Context);
    const { codVenda } = route.params;

    useEffect(() => {
        fetch(urlApi + "Venda?codVenda=" + codVenda ?? 1)
            .then(result => result.json())
            .then((result) => {
                const [fData] = result.data;
                fData.DataVenda = new Date(parseInt(fData.DataVenda)).toLocaleDateString("pt-BR");

                setDadosVenda(fData);
                setListaProdutos(fData.ListaProdutos);
            })
            .catch((error) => {
                Alert.alert("Erro ao consultar as vendas: " + error)
            })
    }, []);

    useEffect(() => {
        const valorTotalCarrinho = listaProdutos.reduce((acc, curr) =>acc += curr.ValorTotal, 0);

        setValorTotal(valorTotalCarrinho.toFixed(2));
    }, [listaProdutos])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <ScrollView>
                <View style={{
                    ...styles.containerNewVenda,
                    alignItems: 'flex-start',
                    ...styles.marginTop
                }}>
                    <View style={{
                        ...stylesDetalhesVenda.container,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        ...stylesDetalhesVenda.marginTop
                    }}>
                        <View>
                            <Text style={{
                                ...stylesDetalhesVenda.txtLabel
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Nome:&nbsp;
                                </Text>
                                {dadosVenda.Nome}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{
                                ...stylesDetalhesVenda.txtLabel
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Data Venda:&nbsp;
                                </Text>
                                {dadosVenda.DataVenda}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        ...stylesDetalhesVenda.container,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        ...stylesDetalhesVenda.marginTop
                    }}>
                        <View >
                            <Text style={{
                                ...stylesDetalhesVenda.txtLabel
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Forma Pagto:&nbsp;
                                </Text>
                                {dadosVenda.FormaPagto}
                            </Text>
                        </View>


                        <View style={{ marginLeft: 20 }}>
                            <Text style={{
                                ...stylesDetalhesVenda.txtLabel
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Nro. Parcelas:&nbsp;
                                </Text>
                                {dadosVenda.QtdParcelas}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        ...stylesDetalhesVenda.container,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        ...stylesDetalhesVenda.marginTop
                    }}>
                        <View >
                            <Text style={{
                                ...stylesDetalhesVenda.txtLabel
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Valor Total:&nbsp;
                                </Text>
                                R$ {valorTotal}
                            </Text>
                        </View>
                    </View>

                    <DataTable style={{ marginTop: 30 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Qtd</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Produto</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Valor Un</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Valor Total</DataTable.Title>
                        </DataTable.Header>
                        {listaProdutos.map((el, i) => {
                            return (
                                <DataTable.Row style={{ marginTop: 10 }} key={el.CodVendaProduto}>
                                    <DataTable.Cell style={styles.centralized}>{el.Quantidade}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{el.NomeProduto}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{el.ValorUnidade}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{el.ValorTotal}</DataTable.Cell>
                                </DataTable.Row>
                            );
                        })}
                    </DataTable>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const stylesDetalhesVenda = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'row',
    },
    marginTop: {
        marginTop: 20
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