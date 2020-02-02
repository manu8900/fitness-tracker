import{Exercise}  from './exercise.model'
import{Subject} from 'rxjs/Subject'
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import {map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private runningExercise:Exercise;
    // private finishedExercises:Exercise[]=[];
    private availableExercises: Exercise[] = [];
    constructor(private db:AngularFirestore){}
    getAvailableExercises(){
    this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map( docArray =>{
     return  docArray.map(doc=>{
       return{
        id:doc.payload.doc.id,
        name:doc.payload.doc.data()['name'],
        duration:doc.payload.doc.data()['duration'],
        calories:doc.payload.doc.data()['calories']
       }
         
       })
    })
    ).subscribe((exercises: Exercise[])=>{
      this.availableExercises=exercises;
      this.exercisesChanged.next([...this.availableExercises]);
      
    });
    }
    starExercise(selectedId:string){
        this.runningExercise = this.availableExercises.find(
            ex=>ex.id === selectedId
            );
            this.exerciseChanged.next({...this.runningExercise});
    }
    getRunningExercise(){
        return {...this.runningExercise};  
    }
    completeExercise(){
        // if(this.runningExercise != null){
            this.addDataToDatabase(
                {...this.runningExercise,
                date:new Date(),
                state:'completed'});
            this.runningExercise =null;
            this.exerciseChanged.next(null);
        // }
    // console.log(this.exercises);
    
    }
    cancelExercise(progress:number){
        this.addDataToDatabase(
            {...this.runningExercise,
            duration:this.runningExercise.duration * (progress/100),
            calories:this.runningExercise.duration * (progress/100),
            date:new Date(),
            state:'cancelled'});
            // console.log(this.exercises);
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }
    fetchCompletedOrCancelledExercises(){
        this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercise:Exercise[])=>{
        this.finishedExercisesChanged.next(exercise);
        });
    }
    private addDataToDatabase(exercise:Exercise){
    this.db.collection('finishedExercises').add(exercise);//storing data to firebase firestore
    }
}