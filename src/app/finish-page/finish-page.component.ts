import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../calculation.service";
interface Report {
  title: String;
  excludedPerson: String;
  amountPaid: Number;
  paidBy: String;
}
@Component({
  selector: "app-finish-page",
  templateUrl: "./finish-page.component.html",
  styleUrls: ["./finish-page.component.css"],
})
export class FinishPageComponent implements OnInit {
  totalReport: Report[] = [];
  finalOutputArray: [] = [];
  constructor(private calculationService: CalculationService) {}

  ngOnInit() {
    this.totalReport = this.calculationService.totalReport;
    //console.log(this.totalReport);
    this.finalOutputArray = this.calculationService.performFinalCalculation();
    this.calculationService.sendEmails();
  }
}
