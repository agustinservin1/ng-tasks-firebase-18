import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { taskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  providers: [TaskService]
})
export default class TaskFormComponent {

  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  
  loading = signal(false);
  
  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
    }); 
  
  async submit()
  {
    if(this.form.invalid) return;
    try {

      this.loading.set(true); 

      const {title, completed} = this.form.value;

      const task: taskCreate = {
        title : title || "",
        completed: !!completed,
      };
      await this._taskService.create(task);
      toast.success(task.title);
      this.form.reset();
    }catch(error){
      console.error('Error creating task', error);
      toast.error("Task creation failed")  
    } finally
    {
      this.loading.set(false);
    }
  }

}
