import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';




@NgModule({
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent],
  imports: [
    SharedModule
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }
