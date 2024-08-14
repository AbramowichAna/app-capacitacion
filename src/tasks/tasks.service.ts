import {Injectable} from '@nestjs/common';
import {Task} from "./task.entity";
import {v4} from "uuid"
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTaskDto} from "./dto/task.dto";

@Injectable()
export class TasksService {

    @InjectRepository(Task)
    private taskRepository: Repository<Task>

    getAllTasks() {
        return this.taskRepository.find()
    }

    createTask(title: string, description: string, status: string) {
        const task = {
            id: v4(),
            title,
            description,
            status
        }
        this.taskRepository.save(task)
        return task;
    }

    async updateTask(id: string, partialTask: Partial<CreateTaskDto>): Promise<Task | null> {
        await this.taskRepository.update(id, partialTask);
        const tasks = await this.taskRepository.find({
            where: { id: id },
        });

        return tasks.length > 0 ? tasks[0] : null;
    }

   deleteTask(id: string){
        this.taskRepository.delete(id)
    }
}
