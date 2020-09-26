import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit, DoCheck {
  @Input() totalCount: number;
  @Input() articles: Article[];
  @Input() page: number;
  @Input() pageSize: number;
  @Input() loadingItem: number;
  @Input() typeList: string;
  default_article: string = 'assets/aericle_empty.jpg';
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  createRange() {
    var item: number[] = [];
    for (let i = 0; i < this.loadingItem; i++) {
      item.push(i);
    }
    return item;
  }

  ngOnInit(): void {
    this.articleService.loading = true;
  }

  ngDoCheck() {
    this.loading = this.articleService.loading;
  }

  pageChanged(event) {
    this.articleService.loading = true;
    this.page = event;

    switch (this.typeList) {
      case 'home':
        this.router.navigateByUrl(`/sayfa/${this.page}`);

        break;
      case 'category':
        let categoryName = this.route.snapshot.paramMap.get('name');
        let categoryId = this.route.snapshot.paramMap.get('id');

        this.router.navigateByUrl(
          `/kategory/${categoryName}/${categoryId}/sayfa/${this.page}`
        );
        break;
      case 'search':
        let searchText = this.route.snapshot.queryParamMap.get('s');
        this.router.navigateByUrl(`/arama/sayfa/${this.page}?s=${searchText}`);
        break;
      case 'archive':
        let year = this.route.snapshot.paramMap.get('year');
        let month = this.route.snapshot.paramMap.get('month');
        this.router.navigateByUrl(`/arsiv/${year}/${month}/sayfa/${this.page}`);
        break;

      default:
        break;
    }
  }
}
