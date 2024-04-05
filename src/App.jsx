import React, { useContext, useState } from 'react'

import { MintContext } from './context/mintContext'

const App = () => {

    const { generateImage, mintNFT } = useContext(MintContext)

    const [query, setQuery] = useState("")
    const [art, setArt] = useState("")
    const [artName, setArtName] = useState("")

    const handleInput = (e) => {

        setQuery(e.target.value)

    }

    const handleText = (e) => {

        setArtName(e.target.value)

    }

    const handleSubmit = async e => {

        e.preventDefault()

        try {

            console.log("otw");

            const { image } = await generateImage(query)
            setArt(image)

            console.log("done");

        } catch (error) {
            console.log(error);
        }

    }

    const handleMinting = async e => {

        e.preventDefault()

        try {

            console.log("Minting");
            const response = await mintNFT(artName)
            console.log(response);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className='flex flex-col w-52'>

                <input type="text" onChange={handleInput} className='border border-black' />
                <input type="text" onChange={handleText} className='border border-black' />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleMinting}>Yes</button>
                <div>
                    {
                        art && <img src={art} alt="art" />
                    }
                </div>

            </div>
        </>
    )
}

export default App