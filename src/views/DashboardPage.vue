<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" style="border-top: 2px solid #ccc">
        <ion-tab-button tab="history" href="/dashboard/history">
          <ion-icon :icon="documentTextOutline" />

          <ion-label>Historial</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/dashboard/profile">
          <ion-icon :icon="buildOutline" />

          <ion-label>Configuración</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  playCircle,
  radio,
  library,
  search,
  buildOutline,
  documentTextOutline,
} from "ionicons/icons";
export default {
  name: "DashboardPage",

  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    library,
    playCircle,
    buildOutline,
    documentTextOutline,
  },
  data() {
    return {
      playCircle,
      radio,
      library,
      search,
      buildOutline,
      documentTextOutline,
    };
  },
};
</script>
