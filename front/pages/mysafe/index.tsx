import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
// import RPC from "./api/web3RPC"; // for using web3.js
import RPC from "../api/ethersRPC"; // for using ethers.js

import Link from 'next/link'

import { getUserSafes, getSafeTxs } from "../../utils/utils"

const clientId = "BF_b5Nq9Q45tOVH24q1ra0O9cZITK2R84Wlhw39iPb2nSPBs2J47naol_6iBf8h3BDgAGBA6Avf0Af8IwENjCQ4";

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );




  // GET DATA FROM SAFE's API

  const [sgn, setSgn] = useState<any>();

  async function updateTxInfo() {
    const safe = await getUserSafes("0x0a7792C2fD7bF4bC25f4d3735E8aD9f59570aCBe");
    console.log("Safe:", safe);
    console.log("Safe[0]:", safe.safes[0]);
    const txs = await getSafeTxs(safe.safes)
    console.log("txs", txs)
    console.log("safeTxHash: ", txs.results[0].safeTxHash);
    const signature = await signHash(txs.results[0].safeTxHash);
    console.log("signature from updateTxInfo: ", signature);

    setSgn(signature)
  }

  useEffect(() => {
    updateTxInfo()
  }, [])






  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            // chainId: "0x1",
            chainId: "0x5",
            // rpcTarget: "https://rpc.ankr.com/eth",
            rpcTarget: "https://eth-goerli.public.blastapi.io",
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };


  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };


  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const signHash = async (messageHash: string) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signHash(messageHash);
    console.log("signedMessage", signedMessage);
  };

  const loggedInView = (
    <>
      <ul>
        <li>
          <Link href="/safe/1">Join</Link>
        </li>
      </ul>
      Signature : {sgn}
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        {"Sign TX on your "}
        <a target="_blank" href="https://gnosis-safe.io/" rel="noreferrer">
          Safe
        </a>
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>
    </div>
  );
}

export default App;
