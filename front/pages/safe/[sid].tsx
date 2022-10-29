import { useRouter } from 'next/router'
import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../api/ethersRPC"; // for using ethers.js
import EmailInputs from '../../components/EmailInputs';
import { getSafeDataFromOurApi, SafeData } from "../../utils/utils"
import SafeCard from "../../components/SafeCard"
import JoinSafe from "../../components/JoinSafe"
import LaunchTX from "../../components/LaunchTX"
import ApproveOrDiscardTX from "../../components/ApproveOrDiscardTX"
import Link from 'next/link'

const clientId = "BF_b5Nq9Q45tOVH24q1ra0O9cZITK2R84Wlhw39iPb2nSPBs2J47naol_6iBf8h3BDgAGBA6Avf0Af8IwENjCQ4";

export type UserData = {
    address: string
    email?: string
    idToken?: string
    name?: string
}

const Safe = () => {
    const router = useRouter()
    const {sid} = router.query as {sid: string}

    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
      null
    );

    const [safeData, setSafeData] = useState<SafeData>();
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

          const safeDataFromOurApi = await getSafeDataFromOurApi(Number(sid))
          
          if (safeDataFromOurApi) {
            setSafeData(safeDataFromOurApi)
          }
          const user = await web3auth.getUserInfo();
          console.log("user", user);

          if (!provider) {
            console.log('error, no provider')
            return
          }

          const rpc = new RPC(provider);
          const address = await rpc.getAccounts();

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
  
    const logout = async () => {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await web3auth.logout();
      setProvider(null);
    };

    const loggedInView = (
      <>
        <div>
            {/* {`${safeData}`} */}
            {/* {userData} */}
        </div>
            {!safeData?.deployed &&
                <div>
                    {/* The Safe has not yet been deployed */}
                    {/* <SafeCard data={safeData} /> */}
                    {userData && userData?.address == safeData?.creator &&
                    // Si user = créateur, affiche qui a signé et si tout le monde a signé, propose de faire la tx de création
                        <LaunchTX userData={userData} safeData={safeData} sid={Number(sid)} />
                    }
                    {userData && safeData && userData?.address != safeData?.creator &&
                    // Si user != créateur, demande de valider la création ⇒ envoie à API confirmation
                        <JoinSafe userData={userData} safeData={safeData} sid={Number(sid)} />
                    }
                </div>
            }

            {safeData?.deployed &&
                <div>
                    The Safe has been deployed
                    {/* <SafeCard data={safeData} /> */}
                    {userData?.address == safeData?.creator &&
                    // Si user = créateur, affiche les tx en cours et un bouton pour en créer
                        <div>
                            You can create transactions on 
                            <a target="_blank" href="https://gnosis-safe.io/app/" rel="noreferrer">
                                gnosis-safe.io
                            </a>
                        </div>
                    }
                    {userData && userData?.address != safeData?.creator &&
                    // Si user != créateur et tx en attente, l’affiche avec son descriptif, et boutons pour accepter ou refuser.
                    // Puis envoie réponse à api
                        <ApproveOrDiscardTX userData={userData} safeData={safeData} sid={Number(sid)} />

                    }
            
            
                </div>
          
          
            }
      </>
    );
  
    const unloggedInView = (
      <Button onClick={login} colorScheme='blue'>Login</Button>
    );
  
    return (
        <div className="container">
            <div className="float-right">

                <Button onClick={logout} colorScheme='blue'>
                    Log Out
                </Button>
            </div>
            <h1 className="title">
                Safe {sid}
            </h1>
        
            <div className="grid">{provider ? loggedInView : unloggedInView}</div>
        </div>
      );
}

export default Safe
