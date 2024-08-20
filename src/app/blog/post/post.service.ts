
import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _postSubject = new Subject<SafeHtml>();

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
  ) {}

  get post$(): Observable<SafeHtml> {
    return this._postSubject.asObservable();
  }

  getPostById(id: string) {
    this.http.get(`posts/generated/${id}`, {responseType: 'text'}).subscribe(res => {
      this._postSubject.next(this.sanitizer.bypassSecurityTrustHtml(res));
    });
  }
}
