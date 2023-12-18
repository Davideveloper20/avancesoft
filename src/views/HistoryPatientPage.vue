<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-header-form">
        <ion-title>
          <span style="font-weight: bold">Historias Clínicas</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card
        v-for="history in myHistories"
        :key="history.id"
        @click="openModal(history)"
      >
        <ion-card-header>
          <ion-card-title
            ><span style="font-weight: bold">Código Historia Clínica #</span>
            {{ history.id }}</ion-card-title
          >

          <ion-card-subtitle
            ><span style="font-weight: bold">identificación paciente :</span>
            {{ history.idPatient }}</ion-card-subtitle
          >
        </ion-card-header>

        <ion-card-content>
          <ion-card-subtitle
            ><span style="font-weight: bold">Doctor:</span>
            {{ history.doctorName }}</ion-card-subtitle
          >

          <ion-card-subtitle
            ><span style="font-weight: bold">Fecha de Registro: </span
            >{{ history.dateRegister }}</ion-card-subtitle
          >
        </ion-card-content>

        <ion-chip color="success">
          <ion-label>historia creada</ion-label>
        </ion-chip>
      </ion-card>
    </ion-content>

    <ion-modal :is-open="showModal">
      <ion-content class="custom-modal-content">
        <ion-header>
          <ion-toolbar class="ion-header-form">
            <ion-title>
              <span style="font-weight: bold"
                >Historia Clínica # {{ selectedHistory.id }}</span
              >
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-list>
          <ion-item>
            <ion-label
              ><span style="font-weight: bold">ID Paciente:</span>
              {{ selectedHistory.idPatient }}</ion-label
            >
          </ion-item>
          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Nombre Paciente:</span>
              {{ selectedHistory.patientName }}</ion-label
            >
          </ion-item>
          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Nombre del Doctor: </span>
              {{ selectedHistory.doctorName }}</ion-label
            >
          </ion-item>
          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Fecha de registro: </span>
              {{ selectedHistory.dateRegister }}</ion-label
            >
          </ion-item>
          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Estado: </span>
              {{ selectedHistory.statusPatient }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Antecedentes: </span>
              {{ selectedHistory.recordPatient }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Evolución : </span>
              {{ selectedHistory.evolutionPatient }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Concepto : </span>
              {{ selectedHistory.concept }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label
              ><span style="font-weight: bold">Recomendaciones: </span>
              {{ selectedHistory.recommendation }}</ion-label
            >
          </ion-item>

          <ion-item class="ion-margin-top">
            <ion-input
              v-model="signature"
              label="Ingresa tu nombre para firmar tu asistencia"
              label-placement="floating"
              placeholder="Nombre"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-button @click="updateSignature">Enviar Firma</ion-button>

        <ion-button @click="closeModal" color="danger">Cerrar</ion-button>
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
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonChip,
} from "@ionic/vue";

export default {
  name: "HistoryPatientPage",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonChip,
  },
  data() {
    return {
      showModal: false,

      user: { ...this.$store.state.user },

      myHistories: [],

      selectedHistory: {},

      signatureData: null,
      signature: "",
    };
  },
  methods: {
    openModal(history) {
      this.selectedHistory = history;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    async updateSignature() {
      if (this.signature !== "") {
        try {
          const response = await axios.put(
            `http://localhost:8000/api/historyConfirmed/${this.selectedHistory.id}`
          );

          if (response) {
            this.showModal = false;
          } else {
            console.log("Error EN FIRMA");
          }
        } catch (error) {
          console.error("Error EN FIRMA:", error);
        }
      }
    },
  },

  mounted: function () {
    axios
      .get(
        `http://localhost:8000/api/historyPatient/${this.user.identification}`
      )

      .then((response) => {
        this.myHistories = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>

<style scoped>
.custom-modal-content {
  padding: 50px;
}

ion-list {
  margin-bottom: 10px;
  padding: 20px;
}

ion-button {
  display: block;
  margin: 0 auto;
  padding: 20px;
}

.ion-header-form {
  --background: #00ffff;
}

ion-title {
  text-align: center;
}
</style>
