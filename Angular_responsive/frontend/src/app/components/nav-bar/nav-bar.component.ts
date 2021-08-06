import {AfterViewInit, ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { SearchService } from "../../services/search.service";
import { Location } from '@angular/common';
import {BreakpointObserver} from "@angular/cdk/layout";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],

})
export class NavBarComponent implements AfterViewInit{
  model: any;

  constructor(private searchService: SearchService, private location: Location,
              private _observer: BreakpointObserver, private cdr: ChangeDetectorRef)  {

  }


  isMobile = false;
  openMenu = false;

  ngAfterViewInit(): void {
    this._observer.observe(['(max-width: 350px)', '(max-width: 700px)']).subscribe(data=> {
      this.isMobile = data.matches;
    })
    this.focusNavBar();
    this.openMenu = false;
    this.cdr.detectChanges();
  }

  public mediaInfo;


  public focusNavBar() {
    if (this.location.path() === "") {
      if (document.getElementById("home")) {
        document.getElementById("home").focus();
      }
    } else if ((this.location.path() === "/mylist")) {
      if (document.getElementById("myList")) {
        document.getElementById("myList").focus();
      }
    }
  }

  public selectedItem(item){
    let media = item.item;
    window.open(`/watch/${media.media_type}/${media.id}`,"_self");
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.searchService.getSearchResult(term).toPromise().then( data => {
            this.mediaInfo = data;
            return this.mediaInfo;
        }
        )
      ),
    )

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  formatter = (x: {name: string}) => x.name;
}
