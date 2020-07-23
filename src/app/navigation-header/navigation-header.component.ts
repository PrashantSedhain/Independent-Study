import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../Auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navigation-header",
  templateUrl: "./navigation-header.component.html",
  styleUrls: ["./navigation-header.component.css"],
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub: Subscription;
  constructor(private authService: AuthService) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authListenerSub = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}
