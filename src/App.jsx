import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import MintNFT from './pages/MintNFT'
import Footer from './components/Footer'

const App = () => {

    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/mint" element={<MintNFT />}></Route>
            </Routes>
            {/* <Footer /> */}

        </>
    )
}

export default App