import { useRouter } from 'next/router'
import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../api/ethersRPC"; // for using ethers.js
import EmailInputs from '../../components/EmailInputs';
import { getSafeData } from "../../utils/utils"

import Link from 'next/link'

const clientId = "BF_b5Nq9Q45tOVH24q1ra0O9cZITK2R84Wlhw39iPb2nSPBs2J47naol_6iBf8h3BDgAGBA6Avf0Af8IwENjCQ4";

const Safe = () => {
    const router = useRouter()
    const {sid} = router.query as {sid: string}

    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
      null
    );
  

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
          await getSafeData(sid)



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

    const accept = async () => {

    };
  
    const decline = async () => {

    };
  
    const loggedInView = (
      <>
        <div className='p-4'>
        
        </div>
  
        <div className='flex p-2'>
            <div className='p-2'>
                <Button onClick={accept} colorScheme='blue'>Accept</Button>
            </div>
            <div className='p-2'>
                <Button onClick={decline} colorScheme='blue'>Decline</Button>
            </div>
        </div>
  
      </>
    );
  
    const unloggedInView = (
      <Button onClick={login} colorScheme='blue'>Login</Button>
    );
  
    //connect
    //sign message to say I agree

    return (
        <div className="container">
          <h1 className="title">
            You've been invited to a
            <a target="_blank" href="https://gnosis-safe.io/" rel="noreferrer">
              {" Safe "}
            </a>
            !
          </h1>
    
          <div className="grid">{provider ? loggedInView : unloggedInView}</div>
          Safe ID: {sid} <br />
        </div>
      );
}

export default Safe
