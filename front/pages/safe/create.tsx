import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../api/ethersRPC"; // for using ethers.js
import EmailInputs from '../../components/EmailInputs';
import { UserData } from './[sid]';

import Link from 'next/link'

const clientId = "BF_b5Nq9Q45tOVH24q1ra0O9cZITK2R84Wlhw39iPb2nSPBs2J47naol_6iBf8h3BDgAGBA6Avf0Af8IwENjCQ4";

const Create = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const [safeName, setSafeName] = useState<string>("")
  const [userData, setUserData] = useState<UserData>();

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

        const user = await getUserInfo();
        console.log("user", user);
        if (!user) {
          console.log('no user')
          return
        }

        if (!web3auth.provider) {
          console.log('error, no provider')
          return
        }

        const rpc = new RPC(web3auth.provider);
        const address = await rpc.getAccounts();
        
        if (!address) {
          console.log('no address...')
          return
        }
        
        setUserData({
          address,
          email: user.email,
          idToken: user.idToken,
          name: user.name,
        })
        
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
    return user
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
    <div className="float-left">
      <h2 className='p-4 text-lg'>
        Creating Safe on Goerli
      </h2>

      <div className='py-2 px-6'>
        <Input
          onChange={handleSafeNameChange}
          value={safeName}
          placeholder='Name your Safe'
          className='w-max'
          width='auto'
        />
      </div>

      <div className='p-4'>
        Invite other users to give their voices !
      </div>

      <div className=''>
        <EmailInputs creator={userData?.address} name={safeName} />
      </div>
    </div>
  );

  const unloggedInView = (
    <Button colorScheme='green' onClick={login}>Login</Button>
  );


  return (
      <div className="container">
      <div className="float-right">
          {provider && 
              <Button onClick={logout} colorScheme='green'>
                  Log Out
              </Button>
          }
      </div>

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
