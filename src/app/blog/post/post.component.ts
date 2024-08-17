import {Component, OnInit} from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";
import {ActivatedRoute} from "@angular/router";

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

  url!: number;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.url = this.activeRoute.snapshot.params['id'];
  }

}
