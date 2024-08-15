import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Glitsh:Lo5066300@dothistask.zxa0h.mongodb.net/?retryWrites=true&w=majority&appName=DoThisTask',
      {
        dbName: 'DoThisTask',
      },
    ),
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
