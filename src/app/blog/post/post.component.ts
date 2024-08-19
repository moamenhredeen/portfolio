import {Component, OnInit} from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";
import {ActivatedRoute} from "@angular/router";
import posts from '../../../posts/posts.json';
import {BlogPost} from "../blog.types";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  url: string | undefined;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    const post = posts.find(e => e.id === +id);
    console.log(post)
    this.url = post?.url;
  }

}
