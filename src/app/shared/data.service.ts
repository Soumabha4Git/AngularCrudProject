import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})


export class DataService {

	private jsonString: string = `{"id":"","courseName":"","rating":"","price":"","trainerName":"","numberOfDays":""}`;	
	private stringJson: string = `{"headerValue":"","paragraphValue":""}`;

	private messageSource = new BehaviorSubject <string>(this.jsonString);
	currentMessage = this.messageSource.asObservable();

	private sourceMessage = new BehaviorSubject <string>(this.stringJson);
	messageCurrent = this.sourceMessage.asObservable();

	changeMessage(message: string) {
		this.messageSource.next(message);
  	}

  messageChange(message: string) {
		this.sourceMessage.next(message);
    }
  
	constructor() {}
}