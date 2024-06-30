import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { QuizModule } from './quiz/quiz.module';
import { TestModule } from './test/test.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [PrismaModule, QuizModule, TestModule, RecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
