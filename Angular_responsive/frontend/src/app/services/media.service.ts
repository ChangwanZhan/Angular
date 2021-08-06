import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient) { }

  readonly baseUrl = "https://concise-wharf-310107.wl.r.appspot.com/apis/media/";

  getCurrentlyPlayingMovies(): any {
    let url = this.baseUrl + "currently-playing-movies";
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return of([]);
    }
  }

  getPopularMedias(mediaCat): any {
    let url = this.baseUrl + `/popular/${mediaCat}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return of([]);
    }
  }

  getTopRatedMedias(mediaCat): any {
    let url = this.baseUrl + `/top-rated/${mediaCat}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return of([]);
    }
  }

  getTrendingMedias(mediaCat): any {
    let url = this.baseUrl + `/trending/${mediaCat}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return of([]);
    }
  }

  getMediaVideo(mediaCat, mediaId): any {
    let url = this.baseUrl + `/video/${mediaCat}/${mediaId}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return null;
    }
  }

  getMediaDetail(mediaCat, mediaId): any {
    let url = this.baseUrl + `/detail/${mediaCat}/${mediaId}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return null;
    }
  }

  getMediaReview(mediaCat, mediaId): any {
    let url = this.baseUrl + `/review/${mediaCat}/${mediaId}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return [];
    }
  }

  getSimilarMedia(mediaCat, mediaId): any {
    let url = this.baseUrl + `/similar/${mediaCat}/${mediaId}`;
    console.log(url)
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return [];
    }

  }

  getRecommendMedia(mediaCat, mediaId): any {
    let url = this.baseUrl + `/recommended/${mediaCat}/${mediaId}`;
    let res: any;
    try {
      res = this.httpClient.get(url).pipe(map(v => v));
      return res;
    } catch (error) {
      return [];
    }
  }
}
