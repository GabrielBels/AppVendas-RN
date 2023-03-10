import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native'
import React, { useState, useContext, useRef } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import NumericInput from 'react-native-numeric-input'
import MainButton from './MainButton';

import { Context } from './ContextProvider';


export default ({ navigation }) => {
    const [nomeCliente, setNomeCliente] = useState('');
    const [dataVenda, setDataVenda] = useState(new Date());
    const [formaPagto, setFormaPagto] = useState('');
    const [qtdParcelas, setQtdParcelas] = useState(1);
    const [btnNextPageEnabled, setBtnNextPageEnabled] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { urlApi } = useContext(Context);

    const formasPagto = [
        { key: "fiado", value: "À Prazo" },
        { key: "credito", value: "Crédito" },
        { key: "debito", value: "Débito" },
        { key: "dinheiropix", value: "Dinheiro/PIX" }
    ];

    function checkToggleBtnNextPage(currentName, currentFormaPagto) {
        let enableButton = true;

        if (!currentName || currentName.length <= 0) {
            enableButton = false;
            setErrorMsg('Preencha o nome do cliente');
        }

        if (!currentFormaPagto || currentFormaPagto.length <= 0) {
            enableButton = false;
            setErrorMsg('Preencha a forma de pagamento');
        }

        setBtnNextPageEnabled(enableButton);

    }

    function salvarCliente() {
        return new Promise((resolve, reject) => {
            // console.log('Envia requisição salvarCliente');
            fetch(urlApi + `GetCadastraCliente?nomeCliente=${(nomeCliente ?? "").trim()}`)
            .then(response => response.json())
            .then((result) => {
                    // console.log(result);
                    resolve(result);
                }).catch((error) => {
                    // console.log(error);
                    reject(error);
                })
        });
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <View style={{
                        ...styleNovaVenda.containerNewVenda,
                        alignItems: 'flex-start',
                        ...styleNovaVenda.marginTop
                    }}>
                        <Text style={styleNovaVenda.txtLabel}>Nome:</Text>
                    </View>
                    <View style={{ ...styleNovaVenda.containerNewVenda, marginTop: 10 }}>
                        <TextInput style={styleNovaVenda.txtInput}
                            placeholder='Nome do cliente'
                            onChangeText={(e) => {
                                setNomeCliente(e)
                                checkToggleBtnNextPage(e, formaPagto);
                            }}>{nomeCliente}</TextInput>
                    </View>

                    <View style={{
                        ...styleNovaVenda.containerNewVenda,
                        alignItems: 'flex-start',
                        ...styleNovaVenda.marginTop
                    }}>
                        <Text style={styleNovaVenda.txtLabel}>Data Venda:</Text>
                    </View>
                    <View style={{ ...styleNovaVenda.containerNewVenda, marginTop: 20 }}>
                        <TextInput style={styleNovaVenda.txtInput}
                            placeholder='Data da Venda'
                            onPressIn={() => {
                                setShowDatePicker(true);
                            }}>
                            {`${dataVenda.getDate().toString().padStart(2, '0')}/${(dataVenda.getMonth() + 1).toString().padStart(2, '0')}/${dataVenda.getFullYear()}`}</TextInput>

                        {showDatePicker && (
                            <DateTimePicker mode='date'
                                value={dataVenda}
                                onChange={(ev) => {
                                    setDataVenda(new Date(ev.nativeEvent.timestamp))
                                    setShowDatePicker(false);
                                    Keyboard.dismiss();
                                }} />
                        )}
                    </View>

                    <View style={{
                        ...styleNovaVenda.containerNewVenda,
                        alignItems: 'flex-start',
                        ...styleNovaVenda.marginTop
                    }}>
                        <Text style={styleNovaVenda.txtLabel}>Forma Pagamento:</Text>
                    </View>
                    <View style={{ ...styleNovaVenda.containerNewVenda, marginTop: 20 }}>
                        <SelectList
                            placeholder="Selecione..."
                            search={false}
                            data={formasPagto}
                            save="value"
                            boxStyles={{ width: 300, borderColor: 'lightgray' }}
                            setSelected={(val) => {
                                setFormaPagto(val);
                                checkToggleBtnNextPage(nomeCliente, val);
                            }}
                        ></SelectList>
                    </View>
                    <View style={{
                        ...styleNovaVenda.containerNewVenda,
                        alignItems: 'flex-start',
                        ...styleNovaVenda.marginTop
                    }}>
                        <Text style={styleNovaVenda.txtLabel}>Parcelas:</Text>
                    </View>
                    <View style={{ ...styleNovaVenda.containerNewVenda, marginTop: 20 }}>
                        <NumericInput
                            rounded={true}
                            minValue={1}
                            maxValue={12}
                            initValue={qtdParcelas}
                            onChange={value => setQtdParcelas(value)} />

                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white', marginTop: 100 }}>
                    <MainButton bgStyle={{
                        ...styleNovaVenda.bottomButton
                    }}
                        title='Próxima Página'
                        onPress={() => {
                            if (!nomeCliente || !dataVenda || !formaPagto || !qtdParcelas) {
                                Alert.alert('Preencha todos os campos');
                                return;
                            }
                            console.log('tttt')

                            // Salvar cliente 
                            salvarCliente().then((resultado) => {
                                navigation.navigate('Produtos',
                                    {
                                        codCliente: resultado.data[0].CodCliente,
                                        nomeCliente: nomeCliente,
                                        dataVenda: dataVenda.getTime(),
                                        formaPagto: formaPagto,
                                        numParcelas: qtdParcelas
                                    })
                            }).catch((error) => {
                                Alert.alert("Erro ao salvar cliente: " + error);
                            })
                        }} />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styleNovaVenda = StyleSheet.create({
    containerNewVenda: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    marginTop: {
        marginTop: 20
    },
    bottomButton: {
        width: 350,
        marginBottom: 60,
        borderRadius: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 10,
        height: 80,
        backgroundColor: '#d0557a',
    },
    txtLabel: {
        marginLeft: 40,
        fontSize: 20
    },
    txtInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        height: 30,
        fontSize: 20,

        width: '70%'
    },
    txtArea: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        fontSize: 20,
        minHeight: 100,

        width: '70%'
    }
});