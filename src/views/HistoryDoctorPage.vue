<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-header-form">
        <ion-title>
          <span style="font-weight: bold">Historias Clínicas Dr:</span>
          {{ $store.state.user.name }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button class="ion-text-center" @click="openModal"
        >Crear Historia Clínica</ion-button
      >

      <history-form
        :show-modal="showModal"
        @form-submitted="handleFormSubmitted"
        @close-modal="closeModal"
      />

      <ion-card
        class="ion-margin-top"
        v-for="history in myHistories"
        :key="history.id"
        @click="openModalHistory(history)"
      >
        <ion-card-header>
          <ion-card-title
            ><span style="font-weight: bold">Código Historia Clínica #</span>
            {{ history.id }}</ion-card-title
          >

          <ion-card-subtitle
            ><span style="font-weight: bold">Nombre paciente :</span>
            {{ history.patientName }}</ion-card-subtitle
          >
        </ion-card-header>

        <ion-card-content>
          <ion-card-subtitle
            ><span style="font-weight: bold"
              >Identificación del paciente :</span
            >
            {{ history.idPatient }}</ion-card-subtitle
          >

          <ion-card-subtitle
            ><span style="font-weight: bold">Fecha de Registro: </span
            >{{ history.dateRegister }}</ion-card-subtitle
          >
        </ion-card-content>

        <ion-chip v-if="history.confirmedPatient" color="success">
          <ion-label>Paciente Confirmado</ion-label>
        </ion-chip>
        <ion-chip v-else color="danger">
          <ion-label>Paciente Pendiente</ion-label>
        </ion-chip>
      </ion-card>
    </ion-content>

    <ion-modal :is-open="showModalHistory">
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
        </ion-list>

        <ion-button @click="closeModalHistory">Cerrar</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script>
import HistoryForm from "./FormHistoryPage.vue";

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
  IonChip,
  IonLabel,
  IonModal,
  IonList,
  IonItem,
} from "@ionic/vue";

export default {
  name: "HistoryDoctorPage",

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
    IonChip,
    IonLabel,

    IonModal,
    IonList,
    IonItem,
    HistoryForm,
  },
  data() {
    return {
      showModal: false,
      user: { ...this.$store.state.user },

      myHistories: [],

      selectedHistory: {},

      showModalHistory: false,
    };
  },

  computed: {
    myHistories() {
      return this.$store.state.myHistories;
    },
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    openModalHistory(history) {
      this.selectedHistory = history;
      this.showModalHistory = true;
    },
    closeModalHistory() {
      this.showModalHistory = false;
    },

    async handleFormSubmitted(formData) {

      try {
        const response = await axios.post(
          "http://localhost:8000/api/history",
          formData
        );

        if (response) {
          this.$store.commit("addHistory", response.data.history);
        } else {
          console.log("Error al guardar historia");
        }
      } catch (error) {
        console.error("Error al crear historia:", error);
      }
    },
  },

  mounted: function () {
    axios
      .get(`http://localhost:8000/api/history/${this.user.identification}`)

      .then((response) => {
        this.$store.commit("setMyHistories", response.data);
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
</style>
