import React from 'react'

import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (

        <>

            <div className='hero-section w-full min-h-screen flex items-center justify-start px-10'>

                <div className='w-2/4 mt-10 flex flex-col items-start justify-center'>

                    <p className='hero-head text-neutral-200 font-bold text-7xl'>

                        Unleash your creativity with AI & mint your ideas into stunning NFTs

                    </p>

                    <div className='flex items-center justify-center'>

                        <button
                            className={
                                "w-36 h-11 mt-10 border-2 border-purple-600 hover:bg-purple-600 text-white rounded-full flex items-center justify-center"
                            }
                            onClick={
                                () => {
                                    navigate('/mint')
                                }
                            }

                        >
                            Get started
                        </button>

                    </div>

                </div>

            </div>

        </>
    )

}

export default Home