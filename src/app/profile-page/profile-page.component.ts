import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.css"],
})
export class ProfilePageComponent implements OnInit {
  typesOfShoes: string[] = [
    "Boots",
    "Clogs",
    "Loafers",
    "Moccasins",
    "Sneakers",
  ];

  constructor() {}
  testing() {
    console.log("I was clicked");
  }
  ngOnInit() {}
}
