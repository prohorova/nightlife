import { Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '../core/search.service';

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

  scrollOptions = {
    barBackground: '#146474',
    barBorderRadius: 0
  };

  constructor(private search: SearchService,
              private sanitizer: DomSanitizer, private zone: NgZone) { }

  ngOnInit() {
    this.bars = this.search.getBars();
    this.location = this.search.getLocation();
  }

  getCategories(bar: any) {
    return bar.categories.map(cat => {
      return cat.title;
    }).join(', ')
  }

  getImage(imgLink: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${imgLink})`);
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
