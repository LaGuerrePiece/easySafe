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
