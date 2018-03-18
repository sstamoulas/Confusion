import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contact = ContactType;
  formErrors = {
    'firstName': '',
    'lastName': '',
    'telNum': '',
    'email': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First Name is required.', 
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastName': {
      'required': 'Last Name is required.', 
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telNum': {
      'required': 'Telephone Number is required.', 
      'pattern': 'Telephone Number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.', 
      'email': 'Email not in valid format.'
    }
  };

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
  	this.feedbackForm = this.fb.group({ 
  	  firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  	  lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  	  telNum: [0, [Validators.required, Validators.pattern]],
  	  email: ['', [Validators.required, Validators.email]],
  	  agree: false,
  	  contactType: 'None',
  	  message: ''
  	});

    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set the form validation messages
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) { return; }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
  	this.feedback = this.feedbackForm.value;
  	console.log(this.feedback);
  	this.feedbackForm.reset({
  	  firstName: '',
  	  lastName: '',
  	  telNum: '',
  	  email: '',
  	  agree: false,
  	  contactType: 'None',
  	  message: ''
  	});
  }

}
