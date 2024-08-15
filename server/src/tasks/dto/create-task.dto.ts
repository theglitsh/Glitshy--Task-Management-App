export class CreateTaskDto {
  readonly title: string;
  readonly description?: string;
  readonly dueDate: Date;
  readonly category: string;
}

export class UpdateTaskDto {
  readonly title?: string;
  readonly description?: string;
  readonly dueDate?: Date;
  readonly category?: string;
  readonly completed?: boolean;
}
