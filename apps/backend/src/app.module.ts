import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AdminModule } from './admin/admin.module'
import { ApplicationsModule } from './applications/applications.module'
import { AuthModule } from './auth/auth.module'
import { AppConfigModule } from './config/config.module'
import { HealthModule } from './health/health.module'
import { JobsModule } from './jobs/jobs.module'
import { MailerModule } from './mailer/mailer.module'
import { PrismaModule } from './prisma/prisma.module'
import { ProfilesModule } from './profiles/profiles.module'
import { RemindersModule } from './reminders/reminders.module'
import { SavedItemsModule } from './saved-items/saved-items.module'
import { ScholarshipsModule } from './scholarships/scholarships.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 120,
      },
    ]),
    AppConfigModule,
    PrismaModule,
    MailerModule,
    HealthModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    ScholarshipsModule,
    SavedItemsModule,
    ApplicationsModule,
    RemindersModule,
    JobsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
