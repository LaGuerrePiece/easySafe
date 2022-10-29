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

export async function getSafeDataFromOurApi(sid: string) {
  try {
      const response = await fetch(`http://localhost:1337/api/safe/${sid}`);
      const data = await response.json();
      console.log("getSafeDataFromOurApi", data);
      
      return data
    } catch (err) {
      console.log(err)
  }
}

export type SafeData = {
  emails: string[],
  numberOfSigners: string
}

export async function createSafeRequest(safeData: SafeData) {
  console.log("createSafeRequest", safeData); 
  try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(safeData)
      });

      const data = await response.json();
      console.log("response to createSafeRequest :", data);
      return 'success'
    } catch (err) {
      console.log(err)
  }
}


// docs: https://safe-transaction-goerli.safe.global/

///v1/owners/{address}/safes/