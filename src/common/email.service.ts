import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {

    constructor(private readonly mailService: MailerService) {
    }

    async sendTextMail(toEmail: string, subject: string, textBody: string, fromEmail: string) {

        this.mailService.sendMail({
            to: toEmail,
            from: fromEmail,
            subject: subject,
            text: textBody,
        }).then(() => {
                console.log("email success")
        })

    }


    async sendTemplateMail(toEmail: string, subject: string, htmlBody: string, fromEmail: string) {
        this.mailService.sendMail({
                to: toEmail,
                from: fromEmail,
                subject: subject,
                html: htmlBody
            })
            .then(() => { })
    }
}