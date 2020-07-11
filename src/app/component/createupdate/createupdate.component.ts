import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';

import { Course } from '../../course';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-createupdate',
  templateUrl: './createupdate.component.html',
  styleUrls: ['./createupdate.component.css']
})



export class CreateupdateComponent implements OnInit {

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
        
        this.formData = message;
      });
      this.dataService.messageCurrent.subscribe(message => this.dataForm = message);

      

      console.log('formData is ' + this.formData);
      console.log('dataForm is ' + this.dataForm);
  }

  submitForm(updateCourseForm: NgForm): void {
      console.log('updateCourseForm for ID ' + updateCourseForm.value.id + ' is ' + JSON.stringify(updateCourseForm.value));
      this.dataService.changeMessage(JSON.stringify(updateCourseForm.value));
      let stringJson = '{"headerValue":"Form to confirm courses before adding it","paragraphValue":"Confirm the Courses that is going to be added"}'
      console.log(JSON.parse(JSON.stringify(stringJson)));
      this.dataService.messageChange(stringJson);
      this.router.navigate(['/confirmCourses']);
  }

}