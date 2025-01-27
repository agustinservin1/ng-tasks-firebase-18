import { Component, inject, signal } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
})
export default class TaskListComponent {
  tasksService = inject(TaskService);
  loading = signal<boolean>(false);
  async handleDelete(id: string) {
    try {
      this.loading.set(true);
      await this.tasksService.delete(id);
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task', error);
      toast.error('Task deletion failed');
    } finally {
      this.loading.set(false);
    }
  }


}
