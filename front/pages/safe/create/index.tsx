import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../../api/ethersRPC"; // for using ethers.js
import EmailInputs from '../../../components/EmailInputs';

import Link from 'next/link'

const clientId = "BF_b5Nq9Q45tOVH24q1ra0O9cZITK2R84Wlhw39iPb2nSPBs2J47naol_6iBf8h3BDgAGBA6Avf0Af8IwENjCQ4"; // get from https://dashboard.web3auth.io

const Create = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const [safeName, setSafeName] = useState<string>("")

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

  const handleSafeNameChange = (event: any) => {
    setSafeName(event.target.value)
  }

  const sendInvites = async () => {
    console.log('safeName', safeName)
  }





  const loggedInView = (
    <>
      <div className='p-4'>
        Creating Safe on Goerli
      </div>

      <div className='p-4'>
        <Input
          onChange={handleSafeNameChange}
          value={safeName}
          placeholder='Name your Safe'
          className='p-4'
        />
      </div>

      <div className='p-2'>
        Invite other users to give their voices !
      </div>

      <div className='p-4'>
        <EmailInputs />
      </div>
    </>
  );

  const unloggedInView = (
    <Button onClick={login} colorScheme='blue'>Login</Button>
  );


  return (
    <div className="container">
      <h1 className="title">
        {"Create your "}
        <a target="_blank" href="https://gnosis-safe.io/" rel="noreferrer">
          Safe
        </a>
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>
    </div>
  )
}

export default Create