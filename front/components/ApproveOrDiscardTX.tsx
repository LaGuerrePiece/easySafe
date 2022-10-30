import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { getSafeTxs, SafeData } from '../utils/utils';

type TxData = {
  id: number
}

export default function ApproveOrDiscardTX(props: {userData: UserData, safeData: SafeData, sid: number}) {
  const [txData, setTxData] = useState<TxData>();

  async function updateTxInfo() {
    const txInfo = await getSafeTxs(props.safeData.safeAddr)
    console.log('txInfo', txInfo)
    console.log("safeTxHash: ", txInfo.results[0].safeTxHash);
    // const signature = await signHash(txs.results[0].safeTxHash);
    // console.log("signature from updateTxInfo: ", signature);

    setTxData(txInfo)
  }

  useEffect(() => {
    updateTxInfo()
  }, [])

  async function launchTX() {
    console.log('launchTX')
  }

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