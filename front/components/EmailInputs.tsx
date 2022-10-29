import { Button, Input, InputGroup, InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import uuid from 'react-uuid';

const baseURL = "http://localhost:1337/api";

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
    let safeid = uuid();
    console.log(data.emails);
    console.log(Object.entries(data.emails[0]));
    let i = 0;
    Object.entries(data.emails[0]).forEach(([key, value], index) => {
      axios.post(baseURL + "/easy-safe-users",{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        },
        data: {
          "WalletAddress": "0x6fDD4A65EfB02f7974E615a6e70bD9E887959b7d",
          "email": value,
          "UID": uuid(),
          "safe":safeid
        }
      }).then((response) => {
        console.log(response);
      });
    });

    /*axios.post(baseURL + "/safes",{
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      },
      data: {
        "address": "0x6fDD4A65EfB02f7974E615a6e70bD9E887959b7d",
        "es_users": data.emails[0],
        "UID": safeid,
        "numberOfSign": data.numberOfSign,
        "numberOfUsers": data.numberOfUsers,
        "name": "SAFENAME"
      }
    }).then((response) => {
      console.log(response);
    });*/
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