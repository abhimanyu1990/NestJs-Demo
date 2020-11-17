import { Module } from '@nestjs/common';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import config from "src/configuration/properties";
import { EmailService } from './email.service';
import nodemailer  from "nodemailer";


@Module({
  imports:[
    MailerModule.forRoot(config[process.env.NODE_ENV]["emailConfig"])
  ],
  providers: [EmailService],
  exports: [EmailService]
})
 export class CommonModule {}