import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IspitiComponent } from "./ispiti/ispiti.component";
import { PredmetiComponent } from "./predmeti/predmeti.component";
import { PrijaveComponent } from "./prijave/prijave.component";

const routes: Routes = [
  { path: "", redirectTo: "/predmeti", pathMatch: "full" },
  { path: "predmeti", component: PredmetiComponent },
  { path: "prijave", component: PrijaveComponent },
  { path: "ispiti", component: IspitiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
