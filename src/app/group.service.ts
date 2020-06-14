import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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
  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  uri = "http://localhost:3000/api/group/";
  constructor(private http: HttpClient) {}

  createGroup(body) {
    this.http
      .post(`${this.uri}/create`, body, { headers: this.headers })
      .subscribe((response) => {
        if (response) {
          console.log("New Group Created Successfully");
        } else {
          alert("Failed to create new Group");
        }
      });
  }
}
