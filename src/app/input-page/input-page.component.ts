import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../calculation.service";
interface Person {
  fullName: string;
  email: string;
}
@Component({
  selector: "app-input-page",
  templateUrl: "./input-page.component.html",
  styleUrls: ["./input-page.component.css"]
})
export class InputPageComponent implements OnInit {
  userWhoPaid: String;

  users: Person[] = [];

  constructor(private calculationService: CalculationService) {}

  ngOnInit() {
    this.users = this.calculationService.users;
  }
}
