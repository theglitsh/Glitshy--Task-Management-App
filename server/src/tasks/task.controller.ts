import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const userId = req.user.userId;
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  async getTasksByUser(@Request() req) {
    const userId = req.user.userId;
    return this.taskService.getTasksByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    // Ensure the user can only access their own tasks
    const userId = req.user.userId;
    return this.taskService.findOne(id, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    // Ensure the user can only update their own tasks
    const userId = req.user.userId;
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.taskService.delete(id, userId);
  }

  @Get('completed')
  async getCompletedTasks(@Request() req) {
    return this.taskService.getCompletedTasks(req.user.userId);
  }

  @Get('incomplete')
  async getIncompleteTasks(@Request() req) {
    return this.taskService.getIncompleteTasks(req.user.userId);
  }

  @Put(':id/complete')
  async markAsCompleted(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ) {
    return this.taskService.markTaskAsCompleted(id, body.completed);
  }
}
