import { Button, Input, InputGroup, InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createSafeRequest } from '../utils/utils';

export default function EmailInputs(props: {creator: string | undefined, name: string | undefined}) {
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

    const success = await createSafeRequest({
      ...data,
      name: props.name,
      emails: data.emails.map((obj: any) => obj.email),
      creator: props.creator
    })

    setSuccess(success)
  }

  return (
    <div className="grid">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <li className='py-1 px-6' key={item.id}>
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
                onClick={() => append({ email: "" })}
                 size="sm"
                  colorScheme='green'
                >
                +
              </Button>
            </div>
            <div className='p-2'>
              <Button
                type="button"
                onClick={() => remove(fields.length - 1)}
                colorScheme='green' size="sm"
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
          <div className='p-5'>
            <Button type="submit" className='p-4' colorScheme='green'>Send invites</Button>
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