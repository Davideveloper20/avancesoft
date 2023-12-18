<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-header-form">
        <ion-title><span style="font-weight: bold">Perfil</span></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item class="ion-margin-top">
          <ion-input
            v-model="user.identification"
            label="Cédula"
            label-placement="floating"
            placeholder="Cédula"
            disabled
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="user.name"
            label="Nombre"
            label-placement="floating"
            placeholder="Nombre"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="user.surname"
            label="Apellido"
            label-placement="floating"
            placeholder="Apellido"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="user.email"
            label="Email"
            label-placement="floating"
            placeholder="Email"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="user.phone"
            label="Teléfono"
            label-placement="floating"
            placeholder="Teléfono"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="user.address"
            label="Dirección"
            label-placement="floating"
            placeholder="Dirección"
          ></ion-input>
        </ion-item>
      </ion-list>

      <ion-button class="ion-margin-top" @click="updateProfile"
        >Actualizar Perfil</ion-button
      >

      <ion-button
        class="ion-margin-top"
        id="present-alert"
        @click="logout"
        color="danger"
        >Cerrar Sesión</ion-button
      >

      <ion-alert
        v-model="showAlert"
        trigger="present-alert"
        header="Confirmar cierre de sesión"
        message="¿Estás seguro de que deseas cerrar sesión?."
        :buttons="alertButtons"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
} from "@ionic/vue";

export default {
  name: "ProfilePage",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAlert,
  },

  data() {
    return {
      user: { ...this.$store.state.user },
      showAlert: false,

      alertButtons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.showAlert = false;
          },
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            this.performLogout();
          },
        },
      ],
    };
  },
  methods: {
    async updateProfile() {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/user/${this.user.id}`,
          this.user
        );

        if (response) {
          this.$store.commit("setUser", response.data.user);
        } else {
          console.log("Error al logueare");
        }
      } catch (error) {
        console.error("Error al loguearse:", error);
      }
    },

    logout() {
      this.showAlert = true;
    },
    performLogout() {
      this.$store.commit("logout");

      console.log("sesion cerrada");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.ion-invalid {
  --highlight-background: #f4c2c2;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.ion-header-form {
  --background: #00ffff;
  text-align: center;
}

.ion-margin-top {
  border-bottom: 1px solid #139e7b;
}

.ion-button-custom {
  margin-top: 20px;
}

ion-title {
  font-size: 25px;
}
</style>
