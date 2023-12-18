<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-header-form">
        <img
          src="https://avances.com.co/img/logo.png"
          alt="Logo"
          class="logo-img"
        />

        <ion-title>
          <span style="font-weight: bold">Inicio de Sesión</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item class="ion-margin-bottom">
        <ion-label>Tipo de Usuario:</ion-label>
        <ion-select v-model="userType">
          <ion-select-option value="Pr">Profesional</ion-select-option>
          <ion-select-option value="Pa">Paciente</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item class="ion-margin-bottom">
        <ion-input
          v-model="identification"
          label="Cédula:"
          label-placement="floating"
          placeholder="Cédula"
        ></ion-input>
      </ion-item>

      <ion-item class="ion-margin-bottom">
        <ion-input
          v-model="password"
          type="password"
          label="Password:"
          label-placement="floating"
          placeholder="Password"
        ></ion-input>
      </ion-item>

      <ion-button @click="login" class="ion-text-center"
        >Iniciar Sesión</ion-button
      >
    </ion-content>

    <ion-modal :is-open="showChangePasswordModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Cambiar Contraseña</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-item class="ion-margin-bottom">
          <ion-label position="floating"
            >Ingresa tu antigua Contraseña</ion-label
          >
          <ion-input v-model="currentPassword" type="password"></ion-input>
        </ion-item>

        <ion-item class="ion-margin-bottom">
          <ion-label position="floating">Ingresa nueva contraseña</ion-label>
          <ion-input v-model="newPassword" type="password"></ion-input>
        </ion-item>

        <ion-button @click="changePassword" expand="full">Enviar</ion-button>
      </ion-content>
    </ion-modal>
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonModal,
} from "@ionic/vue";

export default {
  name: "HomePage",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonModal,
  },
  data() {
    return {
      userType: "Pa",
      identification: "",
      password: "",
      userAll: null,

      showChangePasswordModal: false,

      confirmPassword: "",
      newPassword: "",
      currentPassword: "",

      currentId: "",
    };
  },
  methods: {
    async login() {
      const userLogin = {
        identification: this.identification,
        password: this.password,
        type: this.userType,
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          userLogin
        );

        if (response) {
          this.$store.commit("setUser", response.data.user);

          this.currentId = response.data.user.id;

          this.identification = "";
          this.password = "";

          if (response.data.user.type === "Pr") {
            if (response.data.user.firstLogin) {
              this.showChangePasswordModal = true;
            } else {
              this.$router.push({ path: "/dashboard" });
            }
          } else {
            if (response.data.user.firstLogin) {
              this.showChangePasswordModal = true;
            } else {
              this.$router.push({ path: "/dashboard-client" });
            }
          }
        } else {
          console.log("Error al logueare");
        }
      } catch (error) {
        console.error("Error al loguearse:", error);
      }
    },

    async changePassword() {
      const data = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      };

      try {
        const response = await axios.put(
          `http://localhost:8000/api/changePassword/${this.currentId}`,
          data
        );
        this.$router.push({ path: "/dashboard" });

        this.showChangePasswordModal = false;
      } catch (error) {
        console.error(
          "Error al cambiar la contraseña:",
          error.response.data.error
        );
      }
    },
  },
};
</script>

<style scoped>
.ion-header-form {
  --background: #00ffff;
  text-align: center;
}

ion-title {
  text-align: center;
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.ion-margin-bottom {
  border-bottom: 1px solid #139e7b;
}

ion-button {
  display: block;
  margin: 0 auto;
  padding: 20px;
}
</style>
