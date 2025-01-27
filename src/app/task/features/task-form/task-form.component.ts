import { AfterViewInit, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, taskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  providers: [TaskService]
})
export default class TaskFormComponent  {

  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);
  
  loading = signal(false);

  idTask = input.required<string>();
  
  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
    }); 
  
    constructor(){
      effect(()=>
      {
        const id = this.idTask();
        if(id){
          this.getTask(id);
        }
      })
      
    }
    


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
      const id = this.idTask();
      
      id ? await this._taskService.update(id, task) : await this._taskService.create(task);

      toast.success(`Task ${id ? 'Updated' : 'Created'} successfully.`);
      this._router.navigateByUrl('/tasks');
      
    }catch (error ){
      console.error('Error creating task', error);
      toast.error("Task creation failed")  
    
    } finally
    {
      this.loading.set(false);
    }
  }

  async getTask(id: string){
    const taskSnapshot = await this._taskService.getTask(id);
    if (!taskSnapshot.exists()) return;
    const task = taskSnapshot.data() as Task;
    this.form.patchValue(task);
//   }
//   async deleteTask (id: string) {
//     try {
//       this.loading.set(true);
//       await this._taskService.delete(id);
//       toast.success('Task deleted successfully');
//       this._router.navigateByUrl('/tasks');
//     } catch (error) {
//       console.error('Error deleting task', error);
//       toast.error("Task deletion failed");
//     } finally {
//       this.loading.set(false);
//     }
   }
};
