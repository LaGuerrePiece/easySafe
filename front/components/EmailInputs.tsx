import { Button, Input, InputGroup, InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function EmailInputs() {
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

  const onSubmit = async (data: any) => {
    
    console.log(data)
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
            How many owners are needed to confirm a transaction ?
          </div>
          <div>
            <NumberInput>
              <NumberInputField
                {...register("numberOfSigners")} 
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div className='p-2'>
            <Button type="submit" colorScheme='blue' className='p-4'>Send invites</Button>
          </div>
        </div>
      </form>
    </div>
  );
}