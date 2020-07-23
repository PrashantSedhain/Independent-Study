import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SnackbarService } from "./snackbar.service";
import { Observable } from "rxjs";

interface Group {
  userId: String;
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
  uri = "https://fast-cove-16602.herokuapp.com/api/group";
  // uri = "http://localhost:3000/api/group/";
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

  findGroups(): Observable<{ data: any }> {
    return this.http.get<{ data: any }>(
      // "http://localhost:3000/api/group/findGroups"
      "https://fast-cove-16602.herokuapp.com/api/group/findGroups"
    );
  }

  findGroupByID(id): Observable<{ data: any }> {
    return this.http.get<{ data: any }>(
      // `http://localhost:3000/api/group/findGroupByID/${id}`
      `https://fast-cove-16602.herokuapp.com/api/group/findGroupByID/${id}`
    );
  }
}
