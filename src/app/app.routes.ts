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
  },
  {
    path: "v-skeleton-demo",
    loadComponent: () => import("./libs/ui/components/v-skeleton/demo/v-skeleton.demo").then((m) => m.VSkeletonDemoComponent)
  },
  {
    path: "v-card-demo",
    loadComponent: () => import("./libs/ui/components/v-card/demo/v-card.demo").then((m) => m.VCardDemoComponent)
  },
  {
    path: "v-divider-demo",
    loadComponent: () => import("./libs/ui/components/v-divider/demo/v-divider.demo").then((m) => m.VDividerDemoComponent)
  }
];
