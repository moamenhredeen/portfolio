import { Component } from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
