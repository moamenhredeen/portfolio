import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import posts from '../../../posts/generated/posts.json';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {BlogPost} from "../blog.types";
import {Clipboard} from "@angular/cdk/clipboard";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  imports: [
    UpperCasePipe
  ],
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, AfterViewInit {

  content: SafeHtml = 'loading...';
  post!: BlogPost | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLElement>,
    private clipboard: Clipboard,
  ) {
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    this.post = posts.find(e => e.id === id) as BlogPost;
    if (this.post) {
      this.http.get(`posts/generated/${this.post.url}`, {responseType: 'text'})
        .subscribe(data => {
          const safeHtml = this.sanitizer.bypassSecurityTrustHtml(data)
          this.content = safeHtml;
        })
    }
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
