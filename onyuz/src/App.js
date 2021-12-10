import logo from './logo.svg';

import Web3 from 'web3';
import React, { useState } from "react";
import { ProjeAbi } from './abiler';

import './App.css';

function App() {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    const contractAddr = '0x7ECad02a0e15614Eac9c95a8fA996602205d2583' //kontrat adresi
    const ProjeContract = new web3.eth.Contract(ProjeAbi, contractAddr) //Abi tanıtıldı
    const [number, SetNumber] = useState(0) // solidity ye atama yapmak için değişken (varsayılan olarak 0 atandı)
    const [getNumber, SetGetNumber] = useState('0x00') //wai ile işlem yapıldığı için büyük numaralar gelacektir

    const handleGet = async(e) => {
        e.preventDefault();
        const sonuc = await ProjeContract.methods.get().call(); //get metodunu çağır
        SetGetNumber(sonuc);
        console.log(sonuc);
    }

    const handleSet = async(e) => {
        e.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0]; // owner alındı
        const gas = await ProjeContract.methods.set(number).estimateGas();
        const sonuc = await ProjeContract.methods.set(number).send({
            from: account,
            gas
        })
        console.log(sonuc)
    }

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        form onSubmit = { handleSet } >
        <
        label >
        Ekle:
        <
        input type = 'text'
        name = 'name'
        value = { number }
        onChange = { e => SetNumber(e.target.value) }
        /> < /
        label > <
        input type = 'submit'
        value = 'Ekle' / >
        <
        /form> <
        br / >
        <
        button onClick = { handleGet }
        type = 'button' >
        Get Number <
        /button> { getNumber } <
        br / > <
        /header>  < /
        div >
    );
}

export default App;