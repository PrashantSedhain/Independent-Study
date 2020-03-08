import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-split-page",
  templateUrl: "./split-page.component.html",
  styleUrls: ["./split-page.component.css"]
})
export class SplitPageComponent implements OnInit {
  selected: Number;
  list: number[] = [];
  test: boolean;
  constructor() {}

  ngOnInit() {}

  public createArray() {
    this.list = [];
    if (this.selected == 1) {
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 2) {
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 3) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 4) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 5) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);

      this.list.push(1);
      return this.list;
    }
    if (this.selected == 6) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
  }
}
