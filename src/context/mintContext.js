import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { CONTRACT_ADDRESS, CONTRACT_ABI, PINATA_API_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY, IMG_GEN_AI_API_URL } from "../utils/constants"

const { ethereum } = window;

export const MintContext = React.createContext();

const getEthereumContract = async () => {

    const ethProvider = new ethers.BrowserProvider(ethereum);
    const signer = await ethProvider.getSigner();
    const mintContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return mintContract

}

const apiHeader = {
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'cc80fcd996msh7f9f376662dd8cap19bdd6jsnba059c818896',
        'X-RapidAPI-Host': 'ai-text-to-image.p.rapidapi.com'
    }
}

const pinataHeader = {
    headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY
    }
}

export const ContractProvider = ({ children }) => {

    const [account, setAccount] = useState("")
    const [artBlob, setArtBlob] = useState("")


    const connectWallet = async () => {
        try {

            if (!ethereum) return alert('Please Install Metamask 😵‍💫')

            const accounts = await ethereum.request(
                {
                    method: 'eth_requestAccounts'
                }
            )

            if (accounts.length) {

                setAccount(accounts[0])
                window.location.reload()

            }

        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {

            if (!ethereum) return alert('Please Install Metamask 😵‍💫')

            const accounts = await ethereum.request(
                {
                    method: 'eth_accounts'
                }
            )

            if (accounts.length) {

                setAccount(accounts[0])

            }

        } catch (error) {
            console.log(error);
        }
    }

    const generateImage = async (query) => {

        const options = {
            method: 'POST',
            url: `${IMG_GEN_AI_API_URL}/generate`,
            headers: apiHeader.headers,
            data: {
                prompt: query,
                negativePrompt: ''
            }
        }

        try {

            const response = await axios.request(options);

            const image = response.data.ImageUrl

            const imageBlob = await fetch(image).then(r => r.blob())
            setArtBlob(imageBlob)

            return { image, imageBlob }

        } catch (error) {
            console.log(error);
        }

    }

    const uploadToPinata = async (artName) => {
        try {

            const formData = new FormData();
            formData.append('file', artBlob, artName);

            const response = await axios.post(
                PINATA_API_URL,
                formData,
                pinataHeader
            );

            const ipfsHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`

            return ipfsHash

        } catch (error) {
            console.log(error);
        }

    }

    const mintNFT = async (artName, artDesc) => {
        try {

            const ipfsHash = await uploadToPinata(artName)

            const mintContract = await getEthereumContract()

            const tokenURI = `data:application/json;base64,${btoa(
                JSON.stringify({
                    artName,
                    artDesc,
                    image: ipfsHash,
                })
            )}`;

            const transaction = await mintContract.mintNFT(account, tokenURI)

            await transaction.wait()

            return { ipfsHash, transaction }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(() => {
        if (ethereum) {

            const handleAccountsChanged = async (newAccounts) => {

                if (newAccounts.length > 0) {

                    setAccount(newAccounts[0])

                } else {

                    setAccount('');

                }
            };

            ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {

                window.location.reload()
                ethereum.removeListener('accountsChanged', handleAccountsChanged);

            };
        }
    }, [ethereum])

    return (
        <MintContext.Provider value={{ connectWallet, account, generateImage, mintNFT }}>

            {children}

        </MintContext.Provider>
    )

}