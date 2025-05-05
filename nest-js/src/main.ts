import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"http://localhost:5173"
  });
  const config = new DocumentBuilder()
    .setTitle('API do Teste Full-Stack')
    .setDescription('Documentação das rotas da API')
    .setVersion('1.0')
    .addTag('clientes')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
