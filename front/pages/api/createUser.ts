import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req: any, res: any) {
    if (req.method === 'POST') {
      console.log(req);
      (async () => {
        const rawResponse = await fetch('https://127.0.0.1:1337/api/safe/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({address: "", numberOfSigner: 2, numberOfUsers: 3})
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();

    } else {
      // Handle any other HTTP method
      res.status(200).json({ response: 'Ok' })

    }
  }
  