import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RemindersModule } from './reminders/reminders.module';
import { SavedItemsModule } from './saved-items/saved-items.module';
import { ScholarshipsModule } from './scholarships/scholarships.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ScholarshipsModule,
    SavedItemsModule,
    ApplicationsModule,
    RemindersModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
