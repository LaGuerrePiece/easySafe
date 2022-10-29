import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { getTxInfoFromSafeApi, SafeData } from '../utils/utils';

type TxData = {
  id: number
}

export default function ApproveOrDiscardTX(props: {userData: UserData, safeData: SafeData, sid: number}) {
  const [txData, setTxData] = useState<TxData>();

  async function updateTxInfo() {
    const txInfo = await getTxInfoFromSafeApi()
    setTxData(txInfo)
  }

  useEffect(() => {
    updateTxInfo()
  }, [])

  async function launchTX() {
    console.log('launchTX')
  }

  return (
    <div>
      Here is the last transaction proposition.
      {txData &&
      <div>
        {txData.id}
      </div>
        }
    </div>
  );
}