import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';

import { Course } from '../../course';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})


export class UpdateComponent implements OnInit {

  id: string = '';
  courseName: string = '';
  rating: string = '';
  price: string = '';
  trainerName: string = '';
  numberOfDays: string = '';



  formData: string;
  dataForm: string;


  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
      this.dataService.currentMessage.subscribe(message => {
        this.id = JSON.parse(message).id;
        this.courseName = JSON.parse(message).courseName;
        this.rating = JSON.parse(message).rating;
        this.price = JSON.parse(message).price;
        this.trainerName = JSON.parse(message).trainerName;
        this.numberOfDays = JSON.parse(message).numberOfDays;        
        this.formData = message;
      });
      this.dataService.messageCurrent.subscribe(message => this.dataForm = message);

      

      console.log('formData is ' + this.formData);
      console.log('dataForm is ' + this.dataForm);
  }

  submitForm(updateCourseForm: NgForm): void {
      console.log('updateCourseForm for ID ' + updateCourseForm.value.id + ' is ' + JSON.stringify(updateCourseForm.value));
      this.dataService.changeMessage(JSON.stringify(updateCourseForm.value));
      let stringJson = '{"headerValue":"Form to confirm courses before editing it","paragraphValue":"Confirm the Courses that is going to be edited"}'
      console.log(JSON.parse(JSON.stringify(stringJson)));
      this.dataService.messageChange(stringJson);
      this.router.navigate(['/confirmCourses']);
  }

}
