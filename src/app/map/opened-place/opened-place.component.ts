import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-opened-place',
  templateUrl: './opened-place.component.html',
  styleUrls: ['./opened-place.component.css']
})
export class OpenedPlaceComponent implements OnInit, AfterViewInit {

  private readonly place: Place;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<OpenedPlaceComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.place = data.data;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('[data-fancybox="gallery"]').fancybox({});
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
