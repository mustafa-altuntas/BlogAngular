import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import {
  FormGroup,
  FormControl,
  Validator,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { error } from 'protractor';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
})
export class ArticleAddComponent implements OnInit {
  fileData: File = null;
  picture: string = null;
  articleForm: FormGroup;
  succes: boolean;
  loading: boolean;
  info: string;
  categories:Category[];

  constructor(private articleService: ArticleService, private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.getCategory();
    this.articleForm = new FormGroup({
      title: new FormControl('makale 1', Validators.required),
      contentSummary: new FormControl('makale özeti 1', Validators.required),
      contentMain: new FormControl(''),
      category: new FormControl('', Validators.required),
      picture: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.loading = true;
      this.articleService.addArticle(this.articleForm.value).subscribe(
        (result) => {
          this.succes = true;
          console.log('Eklendi');
        },
        (error) => {
          this.succes = false;
          this.info = 'Bir hata meydana geldi : ' + error;
        }
      );
    }
  }


  displayCategpryName(category){
    return category.name
  }

  getCategory(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }


  upload(files) {
    //eğer kullanıcı 1 den fazla dosya seçerse yanlızca ilk seçtiği dosyayı alıcağız
    this.fileData = files.target.files[0];

    let formData = new FormData();
    formData.append('picture', this.fileData);

    this.articleService.saveArticlePicture(formData).subscribe((result) => {
      this.picture = result.path;
      this.articleForm.controls.picture.setValue(this.picture);
    });
  }
}
