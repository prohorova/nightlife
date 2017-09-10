import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BarsService } from '../../core/bars.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  loading = false;
  searchForm: FormGroup;
  @Input() location: string;
  @Output() searchCompleted = new EventEmitter<any[]>();

  constructor(private fb: FormBuilder,
              private barsService: BarsService) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      location: [this.location, Validators.required]
    })
  }

  submit(searchForm) {
    this.loading = true;
    this.barsService.fetchBars(searchForm.location)
      .subscribe((bars) => {
        this.loading = false;
        this.searchCompleted.next(bars);
      }, (err) => {
        console.log(err);
        this.loading = false;
      })
  }

}
