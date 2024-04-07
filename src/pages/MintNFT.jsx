import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { ColorRing } from 'react-loader-spinner';

import { MintContext } from '../context/mintContext';

const MintNFT = () => {

    const { generateImage, mintNFT } = useContext(MintContext)

    const navigate = useNavigate()

    const [query, setQuery] = useState("")
    const [art, setArt] = useState("")
    const [artName, setArtName] = useState("")
    const [artDesc, setArtDesc] = useState("")
    const [imageHash, setImageHash] = useState("")
    const [transaction, setTransaction] = useState("")
    const [loader, setLoader] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleInput = (e) => {

        setQuery(e.target.value)

    }

    const handleText = (e) => {

        setArtName(e.target.value)

    }

    const handleDesc = (e) => {

        setArtDesc(e.target.value)

    }

    const handleSubmit = async e => {

        e.preventDefault()

        try {

            setLoader(true)

            const { image } = await generateImage(query)
            setArt(image)

            setLoader(false)

        } catch (error) {
            console.log(error);
        }

    }

    const handleMinting = async e => {

        e.preventDefault()

        setLoader(true)

        try {

            const { ipfsHash, transaction } = await mintNFT(artName, artDesc)
            console.log(ipfsHash, transaction);
            setImageHash(ipfsHash)
            setTransaction(transaction)

            setLoader(false)

            setQuery('')
            setArtName('')
            setArtDesc('')

            setSuccess(true)


        } catch (error) {
            console.log(error);
        }

    }

    const goHome = e => {

        e.preventDefault()
        setSuccess(false)
        navigate('/')

    }

    return (

        <>

            <div className='w-72 h-72 absolute md:top-32 md:left-40 top-72 rounded-full -z-50 effect1'></div>

            <div className={
                success
                    ?
                    'w-full h-screen flex justify-center items-center'
                    :
                    'w-full flex justify-center items-center'
            }
            >

                <div className={
                    success
                        ?
                        'w-6/12 bg-white rounded-3xl shadow-3xl flex flex-col items-center justify-center gap-y-6 absolute z-50 py-10'
                        :
                        'hidden'
                }>

                    <p className='text-3xl text-purple-600 font-semibold'>NFT Minted Successfully</p>

                    <p className='text-xl text-purple-600 font-medium'>--- Transaction Details ---</p>

                    <div className='w-9/12 flex flex-col items-start justify-center gap-y-6'>

                        <p className='text-gray-500'>Transaction Hash : {transaction?.hash?.slice(0, 21) + " . . . . . . . . . . . . . . " + transaction?.hash?.slice(-1)}</p>

                        <div className='flex items-center justify-center gap-x-5'>

                            <p className='text-gray-500'>Status : </p>

                            <div className='w-28 h-8 flex items-center justify-evenly bg-green-100 border border-green-500 rounded-lg'>

                                <div className='w-5 h-5 flex items-center justify-center bg-green-500 rounded-full'>

                                    <MdOutlineDone className='text-white font-medium' />

                                </div>

                                <p className='text-sm text-green-500'>Success</p>

                            </div>

                        </div>

                        <p className='text-gray-500'>From : {transaction?.from}</p>

                        <p className='text-gray-500'>To : {transaction?.to}</p>

                        <p className='text-gray-500'>Gas Price : Depends on Network Traffic</p>

                    </div>

                    <div className='w-9/12 border-b-4 border-dashed'></div>

                    <div className='w-9/12 mt-3 flex items-center justify-between'>

                        <button
                            className={
                                "w-12 h-12 border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white rounded-full flex items-center justify-center"
                            }
                            onClick={goHome}
                        >
                            <FaHome className='text-2xl' />
                        </button>

                        <a
                            className={
                                "w-44 h-12 border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white rounded-full flex items-center justify-evenly"
                            }
                            href={imageHash}
                            target='_blank'
                        >
                            <p>See on Pinata</p>
                            <GoArrowUpRight className='text-xl' />
                        </a>

                        <a
                            className={
                                "w-52 h-12 border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white rounded-full flex items-center justify-evenly"
                            }
                            href={`https://sepolia.etherscan.io/tx/${transaction?.hash}`}
                            target='_blank'
                        >
                            <p>See on Etherscan</p>
                            <FaArrowCircleRight className='text-2xl' />
                        </a>

                    </div>

                </div>

                <div className={
                    success
                        ?
                        'w-5/12 flex flex-col items-center justify-start my-32 gap-y-10 blur-sm'
                        :
                        'w-5/12 flex flex-col items-center justify-start my-32 gap-y-10'
                }
                >

                    <div className={
                        art ?
                            `w-full h-80 rounded-xl`
                            :
                            `w-full h-80 border-4 border-dashed border-gray-300 rounded-xl`
                    }
                    >
                        {
                            art
                                ?
                                <img src={art} alt='img' className='w-full h-80 rounded-xl' />
                                :
                                ""
                        }

                    </div>

                    <form className='w-full flex flex-col items-center justify-center gap-y-5'>

                        <div className='w-full flex items-center justify-between relative'>

                            <input
                                type="text"
                                className='w-10/12 h-12 rounded-lg px-3 outline-none border-2 border-white bg-transparent text-white'
                                placeholder="Ask AI : Enter Your Promt"
                                onChange={handleInput}
                            />

                            <div className='absolute right-24'>
                                <p className='text-2xl'>
                                    ✨
                                </p>
                            </div>

                            <button
                                className='w-12 h-12 mr-4 flex items-center justify-center text-gray-300 border-2 border-purple-600 hover:bg-purple-600 rounded-full'
                                onClick={handleSubmit}
                            >

                                {
                                    loader
                                        ?
                                        <ColorRing
                                            visible={true}
                                            height="80"
                                            width="80"
                                            ariaLabel="color-ring-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="color-ring-wrapper"
                                            colors={['white', 'white', 'white', 'white', 'white']}
                                        />
                                        :
                                        <FaSearch />
                                }

                            </button>

                        </div>

                        <div className='w-full flex items-center justify-center relative'
                        >

                            <input
                                type="text"
                                className={
                                    art ?
                                        'w-full h-12 rounded-lg px-3 outline-none border-2 border-white bg-transparent text-white'
                                        :
                                        'w-full h-12 rounded-lg px-3 outline-none border-2 border-white bg-transparent text-white cursor-not-allowed'
                                }
                                disabled={art ? false : true}
                                placeholder="Enter NFT Name"
                                onChange={handleText}
                            />

                            <div className='absolute right-2'>
                                <p className={
                                    art ?
                                        'text-gray-500 text-sm'
                                        :
                                        'text-gray-500 text-sm cursor-not-allowed'
                                }
                                >
                                    TCNFT
                                </p>
                            </div>

                        </div>

                        <textarea
                            type="textArea"
                            className={
                                art ?
                                    'w-full h-28 rounded-lg px-3 py-3 outline-none border-2 border-white bg-transparent text-white'
                                    :
                                    'w-full h-28 rounded-lg px-3 py-3 outline-none border-2 border-white bg-transparent text-white cursor-not-allowed'
                            }
                            disabled={art ? false : true}
                            placeholder="Enter NFT description"
                            onChange={handleDesc}
                        />

                        <button
                            className={
                                art ?
                                    "w-full h-12 border-2 border-purple-600 hover:bg-purple-600 text-white rounded-full flex items-center justify-center"
                                    :
                                    "w-full h-12 border-2 border-purple-600 hover:bg-purple-600 text-white rounded-full flex items-center justify-center cursor-not-allowed"
                            }
                            disabled={art ? false : true}
                            onClick={handleMinting}
                        >

                            {
                                loader
                                    ?
                                    <ColorRing
                                        visible={true}
                                        height="50"
                                        width="50"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={['white', 'white', 'white', 'white', 'white']}
                                    />
                                    :
                                    "Mint NFT"
                            }

                        </button>

                    </form>

                </div >

            </div >

        </>

    )

}

export default MintNFT