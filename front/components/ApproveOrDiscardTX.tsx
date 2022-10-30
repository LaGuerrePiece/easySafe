import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { getSafeTxs, SafeData, updateSignatureInDb } from '../utils/utils';
import RPC from "../pages/api/ethersRPC"; // for using ethers.js

type TxData = {
  id: number
}

export default function ApproveOrDiscardTX(props: {userData: UserData, safeData: SafeData, sid: number, provider: any}) {
  const [txData, setTxData] = useState<TxData>();

  async function updateTxInfo(provider: any) {
    const txInfo = await getSafeTxs(props.safeData.safeAddr)
    console.log('txInfo', txInfo)
    console.log("safeTxHash: ", txInfo.results[0].safeTxHash);
    const signature = await signHash(txInfo.results[0].safeTxHash, provider);
    console.log("signature from updateTxInfo: ", signature);
    if (!signature) return

    updateSignatureInDb(props.userData, props.safeData, signature)

    setTxData(txInfo)
  }

  useEffect(() => {
    updateTxInfo(props.provider)
  }, [])

  async function launchTX() {
    console.log('launchTX')
  }

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
      Here is the last transaction proposed.

      {txData &&
        <div>
          {txData.id}
        </div>
      }
    </div>
  );
}