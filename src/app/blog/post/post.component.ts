import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import posts from '../../../posts/generated/posts.json';
import {BlogPost} from "../blog.types";
import {Clipboard} from "@angular/cdk/clipboard";
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {PostService} from "./post.service";

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  imports: [
    UpperCasePipe,
    AsyncPipe
  ],
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, AfterViewInit {

  content$ = this.postService.post$;
  post!: BlogPost | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private elementRef: ElementRef<HTMLElement>,
    private clipboard: Clipboard,
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    this.post = posts.find(e => e.id === id) as BlogPost;
    this.postService.getPostById(this.post.id)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement
        .querySelectorAll('.copy-code-snippet')
        .forEach((el: any) => {
          console.log(el)
          el.addEventListener('click', (event: any) => {
            const code = event.target.parentElement.querySelector('code')?.innerText
            this.clipboard.copy(code || '');
            el.innerHTML = 'copied'
            el.style.background = 'var(--success)'
            setTimeout(() => {
              el.innerHTML = 'copy';
              el.style.background = 'var(--warning)'
            }, 2000)
          });
        })
    }, 100);
  }
}
