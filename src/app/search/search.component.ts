import { Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BarsService } from '../core/bars.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('list') placeList: ElementRef;

  location: string;
  bars: any[];
  selectedBar: any;

  user;

  constructor(private barsService: BarsService,
              private sanitizer: DomSanitizer,
              private zone: NgZone,
              private auth: AuthService) { }

  ngOnInit() {
    this.bars = this.barsService.getBars();
    this.location = this.barsService.getLocation();
    this.auth.getUser()
      .subscribe((user) => {
        this.user = user;
      }, (err) => {
        console.log(err);
    })
  }

  getCategories(bar: any) {
    return bar.categories.map(cat => {
      return cat.title;
    }).join(', ');
  }

  getImage(imgLink: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${imgLink})`);
  }

  go(bar: any, i: number) {
    return this.barsService.go(bar.id).subscribe(comers => {
      var updatedBars = this.bars.slice();
      var updatedBar = Object.assign({}, bar, {comers});
      updatedBars.splice(i, 1, updatedBar);
      this.bars = updatedBars; // invoke change detection
    });
  }

  isGoing(bar) {
    return this.user && bar.comers && bar.comers.indexOf(this.user._id) !== -1;
  }

  login() {
    this.auth.login();
  }

  isSelected(bar) {
    return this.selectedBar && this.selectedBar.id === bar.id;
  }

  onSearchCompleted(bars) {
    this.bars = bars;
  }

  onSelectPlace(place) {
    this.zone.run(() => {
      this.selectBar(place);
    });
  }

  selectBar(bar) {
    this.selectedBar = bar;
    const barId = this.bars.indexOf(bar);
    if (barId) {
      this.placeList.nativeElement.querySelector(`#bar${barId}`).scrollIntoView();
    }
  }

}
