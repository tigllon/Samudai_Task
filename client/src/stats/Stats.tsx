import React, { useEffect, useState } from 'react'
import Header from '../common/header'
import axios from "axios";
import { ethers } from "ethers"


const API_KEY = "SI45K6HMYVEWR2UXDY5XAQG1FTRGPUH9TV";




function Stats(props: any) {
    const [transaction, setTransaction] = useState([]);
    const [blockHeight, setBlockHeight] = useState(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum);



    useEffect(() => {
        axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${props.walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`).then(res => setTransaction(res.data.result)).catch(err => {
            console.log(err);
        });
    }, [props.walletAddress]);


    setInterval(() => {
        provider.getBlockNumber().then((currBlockHeight) => {
            setBlockHeight(currBlockHeight);
        })
    }, 1000);

    const list = transaction.length !== 0 ? transaction.map((trans: any, index: number) => {
        let date = new Date(parseInt(trans.timeStamp));
        return (< tr key={trans.blockHash} >
            <th scope="row">{index + 1}</th>
            <td>{trans.blockNumber}</td>
            <td>{trans.from}</td>
            <td>{trans.to}</td>
            <td>{date.toDateString()}</td>
        </tr >
        )
    }) : < tr>
        <th scope="row">---</th>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
    </tr >;
    return (
        <div >
            <Header />
            <div>
                <table className="table table-sm table-bordered">
                    <thead className='text-success'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Block Number</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope='col'>Time Stamp</th>
                        </tr>
                    </thead>
                    <tbody className='text-light'>
                        {list}
                    </tbody>
                </table>

            </div>
            <div>
                <div className="card text-center fixed-bottom">
                    <div className="card-header text-success">
                        <h4>Block Height</h4>
                    </div>
                    <div className="card-footer">
                        {blockHeight}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats