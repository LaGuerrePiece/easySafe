import { UserData } from "../pages/safe/[sid]";

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

export async function editDataFromOurApi(userData: UserData, safeData: SafeData, sid: number) {
  console.log('editDataFromOurApi', userData, safeData, sid)

  let res = safeData
  const indexOfUser = res.users.findIndex((obj: any) => obj.email == userData.email)
  const newData = {
    "email": res.users[indexOfUser].email,
    "address": userData.address,
    "joined": true
  }

  res.users[indexOfUser] = newData

  console.log('editSafeRequest', res, sid)
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
}

export async function createSafeRequest(safeData: any) {
  console.log("createSafeRequest", safeData);

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
          "users": safeData.emails.map((email: any) => {
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

export async function editSafeRequest(safeData: SafeData, id: number) {
  console.log("editSafeRequest", safeData);

  //editSafe?id=
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
          "users": safeData.users
        })
      });

      if (response.ok) {
        return 'success'
      }
    } catch (err) {
      console.log(err)
  }
}
export async function getTxInfoFromSafeApi() {



  return {id: 1}
}





// docs: https://safe-transaction-goerli.safe.global/

///v1/owners/{address}/safes/