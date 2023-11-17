import { useState, useEffect } from 'react'
import './App.css'
import abi from "./contractJson/Tracker.json"
import { ethers } from "ethers"
import Status from './Status';
import Products from './AllProducts';
import Admin from './Admin';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState('Not Connected');
  const [isOwner, setIsOwner] = useState(false);
  

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xb82EFf07c22cB17d79cC0E46E2c8E1b438DCf9B9";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        setAccount(account);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        console.log(provider);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        setState({
          provider, signer, contract
        });
        const isOwnerTemp = await contract.isOwner();
        setIsOwner(isOwnerTemp);
      } catch (err) {
        alert(err);
      }
    }
    template();
  }, []);
  return (
    <div className='App'>
      {!isOwner? <div className='sidebyside'>
        <div className="products"><Products state={state} /></div>
        <div className="statuses"><Status state={state} /></div>
      </div> : <Admin state={state}/>}
    </div>
  )
}

export default App
