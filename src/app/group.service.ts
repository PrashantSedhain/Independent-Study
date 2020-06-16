import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SnackbarService } from "./snackbar.service";

interface Group {
  groupName: String;
  count: Number;
  names: Array<String>;
  emails: Array<String>;
}

@Injectable({
  providedIn: "root",
})
export class GroupService {
  ListOfGroups: Array<Group>;
  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  uri = "http://localhost:3000/api/group/";
  constructor(
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) {}

  createGroup(body) {
    this.http
      .post(`${this.uri}/create`, body, { headers: this.headers })
      .subscribe((response) => {
        if (response) {
          this.snackBarService.openSnackBar("Group added!", "Success");
        } else {
          this.snackBarService.openSnackBar("Failure", "Error");
        }
      });
  }

  findGroups() {
    this.http
      .get<{ message: boolean; data: Array<Group> }>(
        "http://localhost:3000/api/group/findGroups"
      )
      .subscribe((res) => {
        if (res.message) {
          this.ListOfGroups = res.data;
        }
      });
  }
}
