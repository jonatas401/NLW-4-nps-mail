import nodemailer, { Transporter } from 'nodemailer';

import handlebars from 'handlebars';
import fs from 'fs'

class SendMailService{

    private client: Transporter

    constructor(){
        nodemailer.createTestAccount().then(account =>{
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter
        })
        

    }
    async execute(to: string, subject: string, variable: object,path: string){
        
        const file = fs.readFileSync(path).toString('utf-8')
        const tampleteParse = handlebars.compile(file)

        const html = tampleteParse(variable)
        
        const message =  await this.client.sendMail({

             to,
             subject,
             html,
             from: 'NPS noreplay@golpe.com'
        })

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();