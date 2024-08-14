import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {Task} from "./tasks/task.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TasksService} from "./tasks/tasks.service";

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ani2003ani',
      database: 'test',
      entities: [Task],
      synchronize: true,
  }),
      TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
