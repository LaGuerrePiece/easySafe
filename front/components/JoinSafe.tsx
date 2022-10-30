import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserData } from '../pages/safe/[sid]';
import { setNewUserJoined, SafeData } from '../utils/utils';

export default function JoinSafe(props: {userData: UserData, safeData: SafeData, sid: number}) {
  const [accept, setAccept] = useState<boolean>(false);
  const [decline, setDecline] = useState<boolean>(false);


  function handleAccept() {
    setAccept(true)
    setNewUserJoined(props.userData, props.safeData, props.sid)
  }

  return (
    <div className="grid">
      <h3 className="title">
        You've been invited to a
        <a target="_blank" href="https://gnosis-safe.io/" rel="noreferrer">
          {" Safe "}
        </a>
        !
      </h3>
      You will join safe {props.safeData?.name}
      <div className='flex p-2'>
          <div className='p-2'>
              <Button onClick={handleAccept} colorScheme='green'>Accept</Button>
          </div>
          <div className='p-2'>
              <Button onClick={() => {setDecline(true)}} colorScheme='green'>Decline</Button>
          </div>
      </div>
      {accept && 
        <div>
          Invitation accepted
        </div>
      }
      {decline && 
        <div>
          Invitation declined
        </div>
      }
  </div>
  );
}