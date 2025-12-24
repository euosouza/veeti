import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "v-input-demo"
  },
  {
    path: "v-input-demo",
    loadComponent: () => import("./libs/ui/components/v-input/demo/v-input-demo").then((m) => m.VInputDemoComponent)
  }
];
