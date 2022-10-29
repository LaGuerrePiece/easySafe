import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createSafeRequest } from '../utils/utils';
import { SafeDataFromApi } from '../pages/safe/[sid]';

export default function TransactionCard(props: {data: any | undefined}) {
  return (
    <div>
      TransactionData
    </div>
  );
}