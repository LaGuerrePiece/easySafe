import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { SafeData } from '../utils/utils';

export default function LaunchTX(props: {userData: UserData, safeData: SafeData, sid: number}) {

  async function launchTX() {
    console.log('launchTX')
  }

  return (
    <div className="grid">
      <div className="p-4">
        One transaction is waiting :
      </div>
      <div className="p-4">
        {props.safeData?.users.filter(obj => obj.joined == true).length}
        {" "} users have joined out of {" "}
        {props.safeData.numberOfSigners}
        {" "} necessary
      </div>

    {props.safeData.numberOfSigners <= props.safeData?.users.filter(obj => obj.joined == true).length &&
        <div>
            <div className="p-4 text-center">
              All is good
            </div>
            <div className="p-4">
              <Button onClick={launchTX} colorScheme='green'>Launch TX !</Button>
            </div>
        </div>
    }
    {props.safeData.numberOfSigners > props.safeData?.users.filter(obj => obj.joined == true).length &&
        <div>
          Cannot send TX right now...
        </div>
    }
</div>
  );
}