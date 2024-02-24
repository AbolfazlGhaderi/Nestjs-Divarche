import { randomInt } from 'crypto';

class sendSMS{

    sendOtpLogin(){
        const otpCode = randomInt(10000,99999)

        console.log(`your otpCode is : ${otpCode}`)

        return otpCode 
    }
}


export default sendSMS