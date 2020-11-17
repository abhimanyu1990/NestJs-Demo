import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RuntimeExceptionFilter } from 'src/common/filters/runtimeException.filter';
import {CustomLogger} from 'src/common/logger/custom-logger.service';
import { SwaggerModule, DocumentBuilder} from "@nestjs/swagger";

import { AuthGuard } from './security/middleware/authGuard.middleware';
import { BootstrapService } from './bootstrap.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log','error','debug', 'warn'],
  });
  app.useGlobalFilters(app.get(RuntimeExceptionFilter)); 
  app.useLogger(app.get(CustomLogger));

  const options = new DocumentBuilder()
    .setTitle('NestJs example')
    .setDescription('The Boilerplate API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)
  
  let bootstrapService = app.get(BootstrapService);
  bootstrapService.createAdmin();
  
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
