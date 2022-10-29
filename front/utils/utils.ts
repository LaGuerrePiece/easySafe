export const serverUrl = "http://10.1.1.68:37000"

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
      const response = await fetch(`${serverUrl}/safes`);
      const data = await response.json();
      console.log("getSafeDataFromOurApi", data);

      return data
    } catch (err) {
      console.log(err)
  }
}

export type SafeData = {
  name: string,
  emails: string[],
  numberOfSigners: string,
  creator: string
}

export async function createSafeRequest(safeData: SafeData) {
  console.log("createSafeRequest", safeData);

  //editSafe?id=
  try {
      const response = await fetch(`${serverUrl}/createSafe`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": safeData.name,
          "safeAddr": "",
          "numberOfSigners": safeData.numberOfSigners,
          "numberOfUsers": safeData.emails.length,
          "creator": safeData.creator,
          "deployed": false,
          "users": safeData.emails.map(email => {
            return {
              "email": email,
              "address": "",
              "joined": false
            }
          })
        })
      });

      if (response.ok) {
        return 'success'
      }
    } catch (err) {
      console.log(err)
  }
}

export async function editSafeRequest(safeData: SafeData, safeId: Number) {
  console.log("createSafeRequest", safeData);

  //editSafe?id=
  try {
      const response = await fetch(`${serverUrl}/editSafe?id=${safeId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": safeData.name,
          "safeAddr": "",
          "numberOfSigners": safeData.numberOfSigners,
          "numberOfUsers": safeData.emails.length,
          "creator": safeData.creator,
          "deployed": false,
          "users": safeData.emails.map(email => {
            return {
              "email": email,
              "address": "",
              "joined": false
            }
          })
        })
      });

      if (response.ok) {
        return 'success'
      }
    } catch (err) {
      console.log(err)
  }
}


// docs: https://safe-transaction-goerli.safe.global/

///v1/owners/{address}/safes/