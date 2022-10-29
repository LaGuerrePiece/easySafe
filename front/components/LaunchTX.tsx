import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { editDataFromOurApi, SafeData } from '../utils/utils';

export default function LaunchTX(props: {userData: UserData, safeData: SafeData, sid: number}) {

  async function launchTX() {
    console.log('launchTX')
  }

  return (
    <div className="grid">
      
    {props.safeData?.users.filter(obj => obj.joined == true).length}
    users have joined out of
    {props.safeData.numberOfSigners}
    necessary
    {props.safeData.numberOfSigners <= props.safeData?.users.filter(obj => obj.joined == true).length &&
        <div>
            All is good
            <Button onClick={launchTX} colorScheme='blue'>Launch TX !</Button>
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