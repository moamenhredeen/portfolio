import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BlogPost} from "./blog.types";
import {debounceTime, Subject, takeUntil} from "rxjs";
import posts from '../../posts/posts.json'
import {UpperCasePipe} from "@angular/common";

@Component({
  standalone: true,
  templateUrl: './blog.component.html',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
  ],
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy{

  searchKeyword = new FormControl<string>('');
  filteredPosts = [...posts];

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchKeyword.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.destroy$)
      )
      .subscribe({
      next: value => {
        console.log(value)
        if(value ===  undefined || value === ''){
          this.filteredPosts = [...posts]
        }
        this.filteredPosts = posts.filter(el => el.title.toLowerCase().includes(value!.toLowerCase()))
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
