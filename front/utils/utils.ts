import { UserData } from "../pages/safe/[sid]";

export const serverUrl = "http://10.1.1.68:37000"
// export const serverUrl = "http://127.0.0.1:37000"

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

export async function getSafeDataFromOurApi(sid: number) {
  try {
      const response = await fetch(`${serverUrl}/safes`);
      const data = await response.json();
      console.log("getSafeDataFromOurApi", data);

      return data[sid]
    } catch (err) {
      console.log(err)
  }
}

export async function setNewUserJoined(userData: UserData, safeData: SafeData, sid: number) {
  console.log('setNewUserJoined', userData, safeData, sid)

  console.log('avant', safeData)
  let res = safeData
  const indexOfUser = res.users.findIndex((obj: any) => obj.email == userData.email)
  if (indexOfUser == -1) {
    console.log("email not found")
    return
  }
  const newData = {
    "email": res.users[indexOfUser].email,
    "address": userData.address,
    "joined": true
  }

  res.users[indexOfUser] = newData

  console.log('apres', res)
  editSafeRequest(res, sid)
}



export type SafeData = {
  name: string,
  safeAddr: string
  numberOfSigners: number,
  numberOfUsers: number,
  creator: string,
  deployed: boolean,
  users: {
    email: string
    address: string
    joined: boolean
  }[],
  transactions: {
    hash: string,
    signatures: {
      address: string,
      signature: string
    }[]
  }[]
}

export async function createSafeRequest(safeData: any) {

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
          "numberOfSigners": Number(safeData.numberOfSigners),
          "numberOfUsers": safeData.emails.length,
          "creator": safeData.creator,
          "deployed": false,
          "users": safeData.emails.map((email: any) => {
            return {
              "email": email,
              "address": "",
              "joined": false
            }
          }),
          "transactions": []
        })
      });

      console.log('body', {
        "name": safeData.name,
        "safeAddr": "",
        "numberOfSigners": safeData.numberOfSigners,
        "numberOfUsers": safeData.emails.length,
        "creator": safeData.creator,
        "deployed": false,
        "users": safeData.emails.map((email: any) => {
          return {
            "email": email,
            "address": "",
            "joined": false
          }
        })
      })

      if (response.ok) {
        return 'success'
      }
    } catch (err) {
      console.log(err)
  }
}

export async function editSafeRequest(safeData: SafeData, id: number) {

  try {
      const response = await fetch(`${serverUrl}/editSafe?id=${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": safeData.name,
          "safeAddr": safeData.safeAddr,
          "numberOfSigners": safeData.numberOfSigners,
          "numberOfUsers": safeData.numberOfUsers,
          "creator": safeData.creator,
          "deployed": safeData.deployed,
          "users": safeData.users,
          "transactions": safeData.transactions
        })
      });

      if (response.ok) {
        return 'success'
      }
    } catch (err) {
      console.log(err)
  }
}


export async function getUserSafes(userAddr: string) {
  try {
    const response = await fetch(`https://safe-transaction-goerli.safe.global/api/v1/owners/${userAddr}/safes/`);
    const data = await response.json();
    console.log(data); 
    return data
  } catch (err) {
    console.log(err)
  }
}
export async function getTxInfoFromSafeApi() {



  return {id: 1}
}




// docs: https://safe-transaction-goerli.safe.global/

export async function getSafeTxs(safeAddr: string) {
  try {
    const response = await fetch(`https://safe-transaction-goerli.safe.global/api/v1/safes/${safeAddr}/all-transactions/`);
    const data = await response.json();
    console.log(data); 
    return data
  } catch (err) {
    console.log(err)
  }
}

// docs: https://safe-transaction-goerli.safe.global/
///v1/owners/{address}/safes/
///v1/safes/{address}/all-transactions/