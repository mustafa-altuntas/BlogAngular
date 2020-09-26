import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  page: number = 1;
  articles: Article[] = [];
  totalCount: number;
  pageSize: number = 2;
  loadingItem: number = 5;
  ajax;
  searcText: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((params) => {
      if (this.ajax != null) this.ajax.unsubscribe();

      this.articles = [];
      this.totalCount = 0;

      if (this.route.snapshot.paramMap.get('page'))
        this.page = Number(this.route.snapshot.paramMap.get('page'));

      this.searcText = this.route.snapshot.queryParamMap.get('s');

      this.ajax = this.articleService
        .getSearchArticles(this.searcText, this.page, this.pageSize)
        .subscribe((data) => {
          this.articles = data.articles;
          this.totalCount = data.totalCount;
        });
    });
  }
}
