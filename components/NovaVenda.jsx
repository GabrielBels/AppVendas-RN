import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import NumericInput from 'react-native-numeric-input'
import MainButton from './MainButton';
import styles from './Styles';


export default ({ navigation }) => {
    const [cltName, setCltName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formaPagto, setFormaPagto] = useState('');
    const [qtdParcelas, setQtdParcelas] = useState(1);
    const [btnNextPageEnabled, setBtnNextPageEnabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

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


    return (<>
        <View style={{ flex: 1 }}>
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
                        setCltName(e)
                        checkToggleBtnNextPage(e, formaPagto);
                    }}>{cltName}</TextInput>
            </View>

            <View style={{
                ...styleNovaVenda.containerNewVenda,
                alignItems: 'flex-start',
                ...styleNovaVenda.marginTop
            }}>
                <Text style={styleNovaVenda.txtLabel}>Data Venda:</Text>
            </View>
            <View style={{ ...styleNovaVenda.containerNewVenda, marginTop: 20 }}>
                <DateTimePicker mode='date'
                    value={selectedDate}
                    onChange={(ev) => setSelectedDate(new Date(ev.nativeEvent.timestamp))} />
            </View>
            {/* <View style={{
            ...styleNovaVenda.containerNewVenda,
            alignItems: 'flex-start',
            ...styleNovaVenda.marginTop
        }}>
            <Text style={styleNovaVenda.txtLabel}>Produtos:</Text>
        </View>
        <View style={{ ...styleNovaVenda.containerNewVenda, marginTop: 20 }}>
            <TextInput style={styleNovaVenda.txtArea}
                multiline={true}
                numberOfLines={4}
                placeholder={'Produto A\nProduto B\nProduto C'}
                onChangeText={(e) => setCltName(e)}>{cltName}</TextInput>
        </View> */}

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
                        checkToggleBtnNextPage(cltName, val);
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
                    onLimitReached={() => Alert.alert('Quantidade máxima de parcelas: 12')}
                    minValue={1}
                    maxValue={12}
                    initValue={1}
                    onChange={value => setQtdParcelas(value)} />

            </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white' }}>
                <MainButton bgStyle={{
                    ...styleNovaVenda.bottomButton,
                    backgroundColor: !!btnNextPageEnabled ? "#c63662" : "#f1ced9",
                    display: !!btnNextPageEnabled ? 'flex': 'none'
                }} color='white'
                    title='Próxima Página'
                    onPress={() => navigation.navigate('Próxima Página', { name: 'Próxima Página' })} />
        </View>

    </>)
}

const styleNovaVenda = StyleSheet.create({
    containerNewVenda: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        backgroundColor: '#800360',
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
    },
    marginTop: {
        marginTop: 20
    }
});