import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() maxRating: number;
  stars: number[];
  starSize = 20;
  starMargin = 2;

  constructor() {
    this.stars = Array.from(new Array(5), (val,index) => index+1);
  }

  ngOnInit() {
  }

  getContainerWidth(rating) {
    return (this.starSize + this.starMargin) * rating + 'px';
  }

}
