import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { MintContext } from '../context/mintContext'

import Logo from "../assets/LogoWhite.png"

const Navbar = () => {

    const { account, connectWallet } = useContext(MintContext)

    const [showAdd, setShowAdd] = useState(false)

    const seeWalletAddress = e => {

        e.preventDefault()
        setShowAdd(!showAdd)

    }

    return (

        <>

            <div className='w-full h-16 flex items-center justify-between px-10 absolute'>

                <div>
                    <img src={Logo} alt="TokenCraft.ai" className='h-9' />
                </div>

                <div className='flex items-center justify-center gap-x-10'>

                    <NavLink to='/' className='text-neutral-200 hover:text-purple-500 text-md'>Home</NavLink>

                    <NavLink to='/about' className='text-neutral-200 hover:text-purple-500 text-md'>About</NavLink>

                    <NavLink to='/ourteam' className='text-neutral-200 hover:text-purple-500 text-md'>Our Team</NavLink>

                    <NavLink to='/mint' className={
                        account
                            ?
                            'text-neutral-200 hover:text-purple-500 text-md'
                            :
                            'hidden'
                    }
                    >
                        Mint NFT</NavLink>

                </div>

                <div>

                    <button
                        className={
                            account ?
                                "w-10 h-10 border-2 border-purple-600 bg-gradient-to-b from-yellow-400 to-pink-600 text-white rounded-full btn-font flex items-center justify-center"
                                :
                                "w-40 h-11 border-2 border-purple-600 hover:bg-purple-600 text-white rounded-full btn-font flex items-center justify-center"
                        }
                        onClick={
                            account ?
                                seeWalletAddress
                                :
                                connectWallet
                        }
                    >
                        {
                            account ?
                                ""
                                :
                                "Connect Wallet"
                        }
                    </button>

                </div>

            </div >

            <div
                className={
                    `flex items-center justify-center h-11 w-96 rounded-lg bg-neutral-200 shadow-md shadow-neutral-500 z-50 absolute top-16 end-5 ${showAdd === true ?
                        'block'
                        :
                        'hidden'
                    }`
                }
            >

                <p className='text-sm text-purple-700'>{account}</p>

            </div>

        </>
    )
}

export default Navbar