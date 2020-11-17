import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { CustomLogger } from "./logger/custom-logger.service";

@Injectable()
export class EmailService {

    constructor(private readonly mailService: MailerService,
                private readonly logger:CustomLogger) {
    }

    async sendTextMail(toEmail: string, subject: string, textBody: string, fromEmail: string) {

        this.mailService.sendMail({
            to: toEmail,
            from: fromEmail,
            subject: subject,
            text: textBody,
        }).then(() => {
               this.logger.log("email success")
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