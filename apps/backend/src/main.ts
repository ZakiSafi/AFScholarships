import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const logger = new Logger('Bootstrap')

  app.use(helmet())
  app.useGlobalInterceptors(new LoggingInterceptor())

  app.enableCors({
    origin: config.get<string>('frontendUrl'),
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AfScholarships API')
    .setDescription('Backend API powered by NestJS, JWT, and Prisma')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  const port = config.get<number>('port') ?? 3000
  await app.listen(port)
  logger.log(
    JSON.stringify({
      event: 'server_started',
      port,
      nodeEnv: config.get<string>('nodeEnv'),
      swagger: '/api/docs',
    }),
  )
}
void bootstrap()
