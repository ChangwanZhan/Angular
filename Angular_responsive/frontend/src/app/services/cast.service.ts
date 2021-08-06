import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private httpClient: HttpClient) { }

  readonly baseUrl = "https://concise-wharf-310107.wl.r.appspot.com/apis/cast/";

  getMediaCast(mediaCat, mediaId): any {
    let url = this.baseUrl + `media/${mediaCat}/${mediaId}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return [];
    }
  }

  getCastDetail(castId): any {
    let url = this.baseUrl + `detail/${castId}`;
    console.log(url);
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return null;
    }
  }

  getCastIds(castId):  any {
    let url = this.baseUrl + `external-ids/${castId}`;
    console.log(url);
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return null;
    }
  }

}
