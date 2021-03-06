import { Component, OnInit, Input, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})


export class DishdetailComponent implements OnInit {

  commentForm: FormGroup;
  comment: Comment;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMsg: string;

  dishcopy = null;
  visibility = 'shown';
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author is required.', 
      'minlength': 'Author must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(private dishservice: DishService,
  			private route: ActivatedRoute,
  			private location: Location,
        private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL) { 
    
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds()
        .subscribe(dishIds => this.dishIds = dishIds);
  	this.route.params
        .switchMap((params: Params) => { 
          this.visibility = 'hidden'; 
          return this.dishservice.getDish(+params['id']); 
        })
        .subscribe(dish => { 
          this.dish = dish; 
          this.dishcopy = dish; 
          this.setPrevNext(dish.id); 
          this.visibility = 'shown'; 
        }, 
        errMsg => this.errMsg = <any>errMsg);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() : void {
  	this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({ 
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set the form validation messages
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) { return; }
    const form = this.commentForm;

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

  getDate() {
    var event = new Date(Date.now());
    var options = { month: 'long', day: 'numeric', year: 'numeric' };
    return event.toLocaleDateString('en-EN', options);
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = this.getDate();

    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
        .subscribe(dish => this.dish = dish);
  }

}
