import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PostService } from './post.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: string;
  user: any;
  url = '';
  image = null;
  fileType = null;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = JSON.parse(await this.storage.get('user'));

    const token = await this.authService.getToken();
    if (!token) {
      return this.router.navigateByUrl('/login');
    }
  }

  imageSelector(input) {
    input.click();
  }

  selectPicture(event) {
    if (event.target.files) {
      this.url = URL.createObjectURL(event.target.files[0]);
      this.image = event.target.files[0];

      this.fileType = this.image.name.split('.').pop().toLowerCase();

      const reader = new FileReader();
      reader.onloadend = () => {
        this.image = reader.result;
        this.image = this.image.split(',')[1];
      };
      reader.readAsDataURL(this.image);
    }
  }

  private createPost() {
    this.postService
      .createPost(this.post, this.user.id, this.image, this.fileType)
      .subscribe(async (res) => {
        if (res.status === 'success') {
          const toast = await this.toastController.create({
            message: 'Login Success. Redirecting...',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          toast.onDidDismiss().then(() => {
            this.router.navigateByUrl('/');
          });
        } else {
          const toast = await this.toastController.create({
            message: res.status,
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        }
      });
  }
}
