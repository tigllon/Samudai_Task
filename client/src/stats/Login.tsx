import { useEffect } from 'react';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import Header from '../common/header';

const BACKEND_ADDR = "http://localhost:5000";

interface loginInterface {
    setWalletAddress: React.Dispatch<React.SetStateAction<string>>
}

const Login = (props: loginInterface) => {
    const setWalletAddress = props.setWalletAddress;
    const domain = window.location.host;
    const origin = window.location.origin;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []).catch(() => console.log('user rejected request'));
    const signer = provider.getSigner();

    useEffect(() => {
        getInformation().then(walletAdd => {
            if (walletAdd) {
                setWalletAddress(walletAdd.trim());
                registerToSamudai(walletAdd);
            }
        })
    })

    async function registerToSamudai(walletAddress: string) {
        await fetch("https://dev-gcn.samudai.xyz/api/member/demo/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "walletAddress": walletAddress,
                "chainId": 10,
                "member": {
                    "did": "hello"
                }
            }
            ),
        });
    }

    async function createSiweMessage(address: any, statement: any) {
        const res = await fetch(`${BACKEND_ADDR}/nonce`, {
            credentials: 'include',
        });
        const message = new SiweMessage({
            domain,
            address,
            statement,
            uri: origin,
            version: '1',
            chainId: 1,
            nonce: await res.text()
        });
        return message.prepareMessage();
    }

    async function signInWithEthereum() {
        const message = await createSiweMessage(
            await signer.getAddress(),
            'Sign in with Ethereum to the app.'
        );
        const signature = await signer.signMessage(message);

        const res = await fetch(`${BACKEND_ADDR}/verify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
            credentials: 'include'
        });
        if (res.status === 200) {
            getInformation().then(walletAdd => {
                if (walletAdd) {
                    setWalletAddress(walletAdd.trim());
                    registerToSamudai(walletAdd);
                }
            })
        }
    }

    async function getInformation() {
        const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
            credentials: 'include',
        });
        if (res.status === 200) {
            let walletAdd = "";
            await res.text().then((temp) => {
                walletAdd = temp.split(":")[1];
            });
            return walletAdd;
        }
        else {
            return "";
        }
    }

    return (
        <>
            <Header onClick={signInWithEthereum} buttonText="Sign-in with Etherium" />
            <div>
                <div className="card text-center">
                    <div className="card-header">
                        <h1>Login With Ethereum</h1>
                    </div>
                    <div className='card-body'>
                        <img src="lock.png" alt="locked" height={200} />
                    </div>
                    <div className="card-footer">
                        <h5 className="card-title">Login To see the Stats</h5>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login