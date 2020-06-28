import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  admin_login: boolean = true;
  vendedor_login: boolean = true;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout() {
    this.afAuth.auth.signOut();
  }
}
