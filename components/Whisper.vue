<template>
  <v-container>
    <v-card class="mx-auto mb-6">
      <v-list>
        <v-list-subheader>WHISPER</v-list-subheader>
        <v-list-item prepend-icon="mdi-script" @click="getTranscription"
          >Read new transcripts</v-list-item
        >
      </v-list>
    </v-card>
    <v-card
      class="mx-auto mb-6"
      title="Last transcription"
      :text="transcription"
    ></v-card>
    <v-card class="mx-auto mb-6">
      <v-list>
        <v-list-item title="Transcription read timer">
          <v-slider
            v-model="timer"
            :max="240"
            :step="5"
            label="Time in s"
            class="ma-4"
            hide-details
          >
            <template v-slot:append>
              <v-text-field
                v-model="timer"
                style="width: 80px"
                type="number"
                hide-details
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <v-list-item>
          <v-card class="mx-auto mb-6">
            <v-btn variant="plain" icon="mdi-play" @click="playTimer()"></v-btn>
            <v-btn
              variant="plain"
              @click="pauseTimer()"
              icon="mdi-pause"
            ></v-btn>
            <v-btn
              variant="plain"
              @click="resetTimer()"
              icon="mdi-stop"
            ></v-btn>
            <v-btn
              variant="plain"
              @click="restartTimer()"
              icon="mdi-restart"
            ></v-btn
          ></v-card>
        </v-list-item>
        <v-list-item>
          <v-card
            class="mx-auto mb-6"
            :loading="isActive"
            title="Next transcription in"
            :text="timerComputed"
          ></v-card>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card class="mx-auto mb-6" title="Custom Entries">
      <v-expansion-panels multiple>
        <v-expansion-panel
          :title="'Last ' + entriesAmount + ' Entries of Transcript'"
        >
          <v-expansion-panel-text>
            <div>{{ customEntries }}</div>
            <v-slider
              v-model="entriesAmount"
              :max="50"
              :step="2"
              label="Entries"
              hide-details
            >
              <template v-slot:append>
                <v-text-field
                  v-model="entriesAmount"
                  style="width: 80px"
                  type="number"
                  hide-details
                ></v-text-field>
              </template>
            </v-slider>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script setup>
//update transcriptions
const store = useGstore();
const {
  lastTranscription: transcription,
  timer,
  entriesAmount,
  isActive,
  customEntries,
} = storeToRefs(store);

const getTranscription = async () => {
  const result = await $fetch("/api/getWhisperTranscript");
  transcription.value = result.content;
};

//timer logic
const { counter, reset, pause, resume } = useInterval(1000, {
  controls: true,
  immediate: false,
});
const playTimer = () => {
  isActive.value = true;
  resume();
};
const pauseTimer = () => {
  isActive.value = false;
  pause();
};
const resetTimer = () => {
  pauseTimer();
  reset();
};
const restartTimer = () => {
  resetTimer();
  playTimer();
};
const timerComputed = computed(() => {
  if (counter.value >= timer.value) {
    getTranscription();
    isActive.value = false;
    pause();
    reset();
  }
  return timer.value - counter.value + "s";
});
const lastEntries = computed(() => {
  return transcription.value.split("\n").slice(-entriesAmount.value).join(" ");
});
</script>
