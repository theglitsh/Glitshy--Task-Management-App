import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const newTask = new this.taskModel({
      ...createTaskDto,
      user: userId,
    });
    return newTask.save();
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, user: userId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.taskModel
      .findOneAndUpdate({ _id: id, user: userId }, updateTaskDto, { new: true })
      .exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.taskModel
      .deleteOne({ _id: id, user: userId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async markTaskAsCompleted(taskId: string, completed: boolean): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.completed = completed;
    return task.save();
  }

  async getCompletedTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId, completed: true }).exec();
  }

  async getIncompleteTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId, completed: false }).exec();
  }
}
