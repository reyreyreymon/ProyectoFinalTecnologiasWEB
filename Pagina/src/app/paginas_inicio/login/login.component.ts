import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  //correo
  onLogin() {
    console.log("email", this.email);
    console.log("pass", this.password);

    this.authService
      .loginEmailUser(this.email, this.password)
      .then((res) => {

        localStorage.setItem("usuario",this.email);
        localStorage.setItem("usuario_logueado","1");
        this.router.navigate(["header"]);
      })
      .catch((err) => console.log("err", err));
  }

  /*
  onLoginGoogle(){
    this.authService.loginGoogleUser().then((res)=>{
      console.log('resUser',res);
      this.router.navigate(['admin/list-books']);
    }).catch(err => console.log('err', err));
  }
*/
  onLoginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((res) => {
        console.log("resUser", res);
      });
      this.router.navigate(["/inicio"]);
  }

  onLogout() {
    this.afAuth.auth.signOut();
    localStorage.setItem("usuario", "");
    localStorage.setItem("tipo_usuario", "");
  }
}
