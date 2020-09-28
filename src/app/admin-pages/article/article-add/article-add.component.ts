import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
})
export class ArticleAddComponent implements OnInit {
  fileData: File = null;
  picture: string = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  upload(files) {
    //eğer kullanıcı 1 den fazla dosya seçerse yanlızca ilk seçtiği dosyayı alıcağız
    this.fileData = files.target.files[0];

    let formData = new FormData();
    formData.append('picture', this.fileData);

    this.articleService.saveArticlePicture(formData).subscribe((result) => {
      this.picture = result.path;
    });
  }
}
