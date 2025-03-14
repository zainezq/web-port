import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  submitQuizResponse(response: any) {
    const responsesCollection = collection(this.firestore, "quizResponses");
    return addDoc(responsesCollection, response);
  }
}
