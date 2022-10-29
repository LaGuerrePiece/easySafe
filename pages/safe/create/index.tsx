import { useRouter } from 'next/router'
import { mailjet } from 'node-mailjet'





const Create = () => {
    mailjet.connect('bad9ff4bc3da4b2dbe719a25edac878c', '39cd9e96d0c3e7a06fb6b682b292a75e')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "nicolasletimon@gmail.com",
            "Name": "Nicolas"
          },
          "To": [
            {
              "Email": "nicolasletimon@gmail.com",
              "Name": "Nicolas"
            }
          ],
          "Subject": "Greetings from Mailjet.",
          "TextPart": "My first Mailjet email",
          "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result: any) => {
        console.log(result.body)
      })
      .catch((err: any) => {
        console.log(err.statusCode)
      })
    
}

export default Create
