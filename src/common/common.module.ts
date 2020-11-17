import { Module } from '@nestjs/common';
import { MailerModule } from "@nestjs-modules/mailer";
import config from "src/configuration/properties";
import { EmailService } from './email.service';
import { LoggerModule } from './logger/logger.module';



@Module({
  imports:[
    MailerModule.forRoot(config[process.env.NODE_ENV]["emailConfig"]),
    LoggerModule
  ],
  providers: [EmailService],
  exports: [EmailService]
})
 export class CommonModule {}