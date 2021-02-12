import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  title?: string
  image?: string | any;
  content?: string;

  buttonText: string = "Create Post";

  uploadPercent?: Observable<number> | any;
  downloadURL?: Observable<string> | any;

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit() { }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.createPost(data)
    this.title = "";
    this.content = "";
    this.image = "";
    this.buttonText = "Post Created!";
    setTimeout(() => this.buttonText = "Create Post", 3000);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const path = `Posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Only Image Files are allowed');
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe((url: any) => (this.image = url));
        })
      )
        .subscribe();
    }
  }



}
