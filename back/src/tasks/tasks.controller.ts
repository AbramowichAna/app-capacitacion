import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(){
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDto){
       return this.taskService.createTask(newTask.title, newTask.description, newTask.status);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        console.log(`id: ${id}`);
        this.taskService.deleteTask(id);
    }

    @Patch(':id')
    patchTask(@Param('id') id: string, @Body() partialTask: Partial<CreateTaskDto>) {
        console.log(`Updating task with id: ${id}`);
        return this.taskService.updateTask(id, partialTask);
    }
}