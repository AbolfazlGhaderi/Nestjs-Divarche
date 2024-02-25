import { randomInt } from 'crypto';

class sendSMS{

    sendOtpLogin(phoneNumber:string){
        const otpCode = randomInt(10000,99999)

        console.log(`your Phone Number is : ${phoneNumber} ||| otpCode is : ${otpCode}`)

        return otpCode 
    }
}


export default sendSMS