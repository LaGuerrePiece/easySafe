import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { getSafeTxs, SafeData, updateSignatureInDb } from '../utils/utils';
import RPC from "../pages/api/ethersRPC"; // for using ethers.js
import { ethers } from 'ethers';

export default function ApproveOrDiscardTX(props: {userData: UserData, safeData: SafeData, sid: number, provider: any}) {
  const [txData, setTxData] = useState<any>();
  const [alreadySigned, setAlreadySigned] = useState<Boolean>(false);

  async function updateTxInfo(provider: any) {
    if (alreadySigned) {
      console.log('alreadySigned', alreadySigned)
      return
    }
    const txInfo = await getSafeTxs(props.safeData.safeAddr)
    console.log('txInfo', txInfo)
    console.log("txInfo.results[0]: ", txInfo.results[0]);
    setTxData(txInfo.results[0])
  }

  async function sign(provider: any) {
    console.log('txData', txData)
    const signature = await signHash(txData.safeTxHash, provider);
    if (!signature) return

    setAlreadySigned(true)
    updateSignatureInDb(props.userData, props.safeData, signature)
  }

  useEffect(() => {
    updateTxInfo(props.provider)
  }, [])

  const signHash = async (messageHash: string, provider: any) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signHash(messageHash);
    console.log("signedMessage", signedMessage);
    return signedMessage
  };

  return (
    <div className="grid">
      Here is the last transaction proposed :
      
      {txData &&
        <div className="grid">
          <div className="p-4">
            to: {""}{txData.to}
          </div>
          <div>
            value: {""}{ethers.utils.formatEther(txData.value)} ETH
          </div>
        </div>
      }
      <div className="p-4">
        <Button onClick={() => {sign(props.provider)}} colorScheme='green'>Launch TX !</Button>
      </div>
    </div>
  );
}