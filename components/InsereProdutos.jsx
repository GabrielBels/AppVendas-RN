import { View, TouchableWithoutFeedback, Text, TextInput, StyleSheet, Keyboard, Alert, ScrollView } from 'react-native'
import React, { useEffect, useRef, useContext, useState } from 'react'
import NumericInput from 'react-native-numeric-input'
import MainButton from './MainButton'
import { DataTable } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';

import styles from './Styles'

import {Context} from './ContextProvider';

export default ({ route, navigation }) => {
    const [currProdutoNome, setCurrProdutoNome] = useState("");
    const [currProdutoQtde, setCurrProdutoQtde] = useState(1);
    const [currProdutoValor, setCurrProdutoValor] = useState(0);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [valorCarrinho, setValorCarrinho] = useState(0);
    const {urlApi} = useContext(Context);

    const { codCliente, dataVenda,
        formaPagto, numParcelas } = route.params;

    const btnFinalizar = useRef(null);

    useEffect(() => {
        atualizaValorFinal();

        setCurrProdutoNome("");
        setCurrProdutoQtde(1);
        setCurrProdutoValor(0);
    }, [listaProdutos]);

    function atualizaValorFinal() {
        const vlrTotal = listaProdutos.reduce((prev, curr) => {
            return prev += curr.valorTotal;
        }, 0);

        setValorCarrinho(vlrTotal.toFixed(2));
    }

    function finalizarVenda() {
        return new Promise((resolve, reject) => {
            const vendaObj = {
                "codCliente": codCliente,
                "dataVenda": dataVenda,
                "formaPagamento": formaPagto,
                "numParcelas": numParcelas,
                "valorTotal": valorCarrinho,
                "listaProdutos":  listaProdutos
            };

            fetch(urlApi + `Venda`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vendaObj)
            })
                .then(response => response.json())
                .then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                })
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <ScrollView>
                <View style={{
                    ...styleInsereProdutos.containerNewVenda,
                    alignItems: 'flex-start',
                    ...styleInsereProdutos.marginTop
                }}>
                    <Text style={styleInsereProdutos.txtLabel}>Produto:</Text>
                    <TextInput style={styleInsereProdutos.txtInput}
                        placeholder='Nome do Produto'
                        onChangeText={(e) => {
                            setCurrProdutoNome(e);
                        }}>{currProdutoNome}</TextInput>


                    <Text style={styleInsereProdutos.txtLabel}>Valor:</Text>

                    <CurrencyInput style={styleInsereProdutos.txtInput}
                        value={currProdutoValor}
                        onChangeValue={(e) => setCurrProdutoValor(e.toFixed(2))}
                        placeholder='Ex: 129,90' />

                    <Text style={styleInsereProdutos.txtLabel}>Quantidade:</Text>

                    <View style={{ display: 'flex', alignSelf: 'center', marginTop: 20 }}>
                        <NumericInput
                            rounded={true}
                            initValue={currProdutoQtde}
                            minValue={1}
                            maxValue={999}
                            value={currProdutoQtde}
                            onChange={value => setCurrProdutoQtde(value)} />
                    </View>

                    <View style={styleInsereProdutos.btnSubmit}>
                        <MainButton bgStyle={styles.mainButton} color='white'
                            title='Adicionar Produto'
                            onPress={() => {
                                if (!currProdutoNome || !currProdutoValor) {
                                    Alert.alert("Preencha o nome e valor");
                                    return;
                                }

                                setListaProdutos(ev => [...ev, {
                                    nome: (currProdutoNome ?? "").trim(),
                                    qtd: currProdutoQtde,
                                    valorUnitario: currProdutoValor,
                                    valorTotal: currProdutoQtde * currProdutoValor
                                }]);

                            }}
                        />
                    </View>

                    <View style={styleInsereProdutos.btnSubmit}>
                        <MainButton bgStyle={{
                            ...styles.mainButton,
                            backgroundColor: 'darkgreen'
                        }}
                            refItem={btnFinalizar}
                            color='white'
                            title={`Finalizar (R$ ${valorCarrinho.toLocaleString("pt-BR")})`}
                            onPress={() => {
                                finalizarVenda().then((resultado) => {
                                    if (!resultado.sucess)
                                        throw resultado.message;

                                    navigation.navigate('Início', { name: 'Início' });
                                }).catch((ex) => {
                                    Alert.alert("Erro ao salvar venda: " + ex)
                                });
                            }}
                        />
                    </View>


                    <DataTable style={{ marginTop: 30 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Qtd.</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Produto</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Total</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Ação</DataTable.Title>
                        </DataTable.Header>
                        {listaProdutos.map((el, i) => {
                            return (
                                <DataTable.Row style={{ marginTop: 10 }} key={i}>
                                    <DataTable.Cell style={styles.centralized}>{el.qtd}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{el.nome}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>{el.valorTotal}</DataTable.Cell>
                                    <DataTable.Cell style={styles.centralized}>
                                        <MainButton onPress={() => {
                                            setListaProdutos(ev => ev.filter((el, i2) => i2 != i));
                                        }} bgStyle={styleInsereProdutos.btnDeleteProduto} color='white'
                                            title='Apagar' />
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

const styleInsereProdutos = StyleSheet.create({
    btnDeleteProduto: {
        backgroundColor: 'darkred'
    },
    txtInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        height: 30,
        fontSize: 20,
        width: '70%',
        left: 60,
        marginTop: 10
    },
    txtLabel: {
        marginLeft: 40,
        fontSize: 20,
        marginTop: 20
    }, containerNewVenda: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }, marginTop: {
        marginTop: 20
    },
    btnSubmit: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})