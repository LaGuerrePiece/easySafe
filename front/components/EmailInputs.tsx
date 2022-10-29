import { Button, Input, InputGroup, InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createSafeRequest } from '../utils/utils';

export default function EmailInputs(props: {creator: string | undefined}) {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      emails: [{ email: "" }],
      numberOfSigners: 1
    }
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "emails"
    }
  );
  const [success, setSuccess] = useState<string | undefined>(undefined);


  const onSubmit = async (data: any) => {
    console.log(data)

    data.emails.forEach((email: String)  => {

      console.log(email);
      // functionToSendEmail(email);
      
    });

    //http://localhost:3000/api/createUser

    const success = await createSafeRequest({
      ...data,
      emails: data.emails.map((obj: any) => obj.email),
      creator: props.creator
    })
    console.log('creator', props.creator)
    setSuccess(success)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <li className='p-1' key={item.id}>
                <InputGroup>
                  <InputLeftAddon children={`user ${index + 1}`} />
                  <Input
                    placeholder="alice@gmail.com"
                    defaultValue={`${item.email}`}
                    {...register(`emails.${index}.email`)} 
                    />
                </InputGroup>
              </li>
            );
          })}
        </ul>

        <div className='flex flex-col items-center p-2'>
          <div className='flex'>
            <div className='p-2'>
              <Button
                type="button"
                onClick={() => append({ email: "" })}
                colorScheme='blue' size="sm"
                >
                +
              </Button>
            </div>
            <div className='p-2'>
              <Button
                type="button"
                onClick={() => remove(fields.length - 1)}
                colorScheme='blue' size="sm"
                >
                -
              </Button>
            </div>
          </div>
          <div className='p-2'>
            {`How many owners out of ${fields.length} are needed to confirm a transaction ?`}
          </div>
          <div>
            <NumberInput min={1} max={fields.length}>
              <NumberInputField
                {...register("numberOfSigners")} 
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div className='p-3'>
            <Button type="submit" colorScheme='blue' className='p-4'>Send invites</Button>
          </div>
          {success && 
            <div className='p-3'>
              Request successful. Waiting for users to respond !
            </div>
          }
        </div>
      </form>
    </div>
  );
}