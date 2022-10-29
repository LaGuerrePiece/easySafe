export async function getSafeInfo(safeAddress: string) {
  try {
    const response = await fetch(`https://safe-transaction-goerli.safe.global/api/v1/safes/${safeAddress}`);
    const data = await response.json();
    console.log(data); 
    return data
  } catch (err) {
    console.log(err)
  }
}


export async function getSafeData(sid: string) {
  const response = await fetch(`http://localhost:1337/api/safe/${sid}`);

  try {
      const response = await fetch(`http://localhost:1337/api/safe/1`);
      const data = await response.json();
      console.log(data); 
    } catch (err) {
      console.log(err)
  }
}


// docs: https://safe-transaction-goerli.safe.global/

///v1/owners/{address}/safes/