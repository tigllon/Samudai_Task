import React, { useState } from 'react'
import Login from './Login'
import Stats from './Stats'

function StatsHome() {
    const [walletAddress, setWalletAddress] = useState("");

    return (
        <>
            {walletAddress ? <Stats walletAddress={walletAddress} /> : <Login setWalletAddress={setWalletAddress} />}
        </>
    )
}

export default StatsHome