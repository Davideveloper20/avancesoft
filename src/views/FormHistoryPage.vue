<template>
  <ion-modal :is-open="showModal" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar class="ion-header-form">
        <ion-title>Formulario de Historia Clínica</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          :class="{ 'ion-invalid': errorMessages.doctorName }"
          class="ion-margin-top"
        >
          <ion-input
            :clear-input="true"
            v-model="doctorName"
            label="Nombre del Médico"
            label-placement="floating"
            placeholder="Nombre del Médico"
          ></ion-input>

          <div v-if="errorMessages.doctorName" class="error-message">
            {{ errorMessages.doctorName }}
          </div>
        </ion-item>
        <ion-item
          :class="{ 'ion-invalid': errorMessages.idDoctor }"
          class="ion-margin-top"
        >
          <ion-input
            v-model="idDoctor"
            label="Identificación del Médico"
            label-placement="floating"
            placeholder="Identificación del Médico"
          ></ion-input>

          <div v-if="errorMessages.idDoctor" class="error-message">
            {{ errorMessages.idDoctor }}
          </div>
        </ion-item>

        <ion-item
          :class="{ 'ion-invalid': errorMessages.patientName }"
          class="ion-margin-top"
        >
          <ion-input
            v-model="patientName"
            label="Nombre del Paciente"
            label-placement="floating"
            placeholder="Nombre del Paciente"
          ></ion-input>

          <div v-if="errorMessages.patientName" class="error-message">
            {{ errorMessages.patientName }}
          </div>
        </ion-item>

        <ion-item
          :class="{ 'ion-invalid': errorMessages.idPatient }"
          class="ion-margin-top"
        >
          <ion-input
            v-model="idPatient"
            label="Identificación del Paciente"
            label-placement="floating"
            placeholder="Identificación del Paciente"
          ></ion-input>

          <div v-if="errorMessages.idPatient" class="error-message">
            {{ errorMessages.idPatient }}
          </div>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="currentDateTime"
            readonly
            label="Fecha y Hora"
            label-placement="floating"
            placeholder="Fecha y Hora"
          ></ion-input>

          <ion-button @click="setCurrentTime" slot="end">Capturar</ion-button>
        </ion-item>

        <ion-item
          :class="{ 'ion-invalid': errorMessages.statusPatient }"
          class="ion-margin-top"
        >
          <ion-input
            v-model="statusPatient"
            label="Estado del Paciente"
            label-placement="floating"
            placeholder="Estado del Paciente"
          ></ion-input>

          <div v-if="errorMessages.statusPatient" class="error-message">
            {{ errorMessages.statusPatient }}
          </div>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="recordPatient"
            label="Antecedentes"
            label-placement="floating"
            placeholder="Antecedentes"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="evolutionPatient"
            label="Evolución Final"
            label-placement="floating"
            placeholder="Evolución Final"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="concept"
            label="Concepto Profesional"
            label-placement="floating"
            placeholder="Concepto Profesional"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-input
            v-model="recommendation"
            label="Recomendaciones"
            label-placement="floating"
            placeholder="Recomendaciones"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-button-custom">
          <ion-label>Imagen del Paciente</ion-label>
          <input type="file" @change="handleImageChange" />
        </ion-item>
      </ion-list>

      <ion-button class="ion-button-custom" @click="submitForm"
        >Guardar</ion-button
      >

      <ion-button class="ion-button-custom" @click="closeModal"
        >Cancelar</ion-button
      >
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/vue";

export default {
  name: "FormHistory",

  components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
  },
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      doctorName: "",
      idDoctor: "",
      patientName: "",
      idPatient: "",
      dateRegister: "",
      statusPatient: "",
      recordPatient: "",
      evolutionPatient: "",
      concept: "",
      recommendation: "",
      patientImage: null,
      base64Image: null,

      confirmedPatient: false,

      currentDateTime: "",

      errorMessages: {
        doctorName: null,
        idDoctor: null,
        patientName: null,
        idPatient: null,
        statusPatient: null,
      },
    };
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        const formData = {
          doctorName: this.doctorName,
          idDoctor: this.idDoctor,
          patientName: this.patientName,
          idPatient: this.idPatient,
          dateRegister: this.currentDateTime,
          statusPatient: this.statusPatient,
          recordPatient: this.recordPatient,
          evolutionPatient: this.evolutionPatient,
          concept: this.concept,
          recommendation: this.recommendation,

          patientImage: JSON.stringify(this.base64Image),
          confirmedPatient: false,
        };
        this.$emit("form-submitted", formData);
        this.closeModal();
      } else {
        console.log("no se pudo enviar form de history");
      }
    },

    validateForm() {
      this.errorMessages = {
        doctorName: null,
        idDoctor: null,
        patientName: null,
        idPatient: null,
        statusPatient: null,
      };

      let isValid = true;
      for (const field of Object.keys(this.errorMessages)) {
        if (!this[field]) {
          this.errorMessages[field] = "Este campo es requerido.";
          isValid = false;
        }
      }
      return isValid;
    },

    setCurrentTime() {
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleString();
      this.currentDateTime = formattedTime;
    },

    closeModal() {
      this.$emit("close-modal");
    },

    handleImageChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.base64Image = reader.result;
        };
        reader.readAsDataURL(file);
      }
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
}

.ion-margin-top {
  border-bottom: 1px solid #139e7b;
}

.ion-button-custom {
  margin-top: 20px;
}
</style>
