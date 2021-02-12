import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post';
import { PostService} from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts?: Observable<Post[]> | any

  public name: string = '**The Big Bang Theory**';
  public text: string = 'Custom **Markdown in Angular** example!';

  constructor(private postService: PostService, public auth: AuthService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts()
    console.log(this)
  }

  delete(id: string){
    this.postService.deletePost(id);
  }

}
