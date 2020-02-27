import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-navigation-header",
  templateUrl: "./navigation-header.component.html",
  styleUrls: ["./navigation-header.component.css"]
})
export class NavigationHeaderComponent implements OnInit {
  constructor() {}
  selectedNumber: Number = 0;

  selectChangeHandler() {
    console.log("Selected number is " + this.selectedNumber);
  }

  ngOnInit() {}
}
