import {Routes} from "@angular/router";
import {BlogComponent} from "./blog.component";
import {PostComponent} from "./post/post.component";

export const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: ':id',
    component: PostComponent,
  }
]
