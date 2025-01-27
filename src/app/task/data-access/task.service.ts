import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  collectionData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../shared/data-acces/auth-state.service';
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
export type taskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable()
export class TaskService {

  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService);
  
  private _collection = collection(this._firestore, PATH);
  private _query = query(this._collection, where('userId', '==', this._authState.currentUser?.uid))
  
  loading = signal<boolean>(true);

  constructor(){
    console.log(this._authState.currentUser);
  }

  getTasks = toSignal(
    (collectionData(this._query, { idField: 'id' }) as Observable<Task[]>).pipe(
      tap(() => {
        this.loading.set(false); 
      }),
      catchError((error) => {  
        this.loading.set(false)
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    });

    getTask(id:string) {
      const docRef = doc(this._collection,id);
      return getDoc(docRef)
    }
    create(task: taskCreate) {
      return addDoc(this._collection, {...task, userId:this._authState.currentUser?.uid});
    }
    update(id: string, task: taskCreate) {
      const docRef = doc(this._collection, id);
      return updateDoc(docRef, task);
    }
    delete(id: string) {
      const docRef = doc(this._collection, id);
      return deleteDoc(docRef);
    }
}