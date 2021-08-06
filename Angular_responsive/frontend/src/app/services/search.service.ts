import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})


export class SearchService {
  readonly baseUrl = "https://concise-wharf-310107.wl.r.appspot.com/apis/search/";

  constructor(private httpClient: HttpClient) { }

  getSearchResult(query: string): any {
    if (query == "") {
      return of([]);
    }
    let url = this.baseUrl + query;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return of([]);
    }
  }
}
