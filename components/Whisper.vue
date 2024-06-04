<template>
  <v-container>
    <v-card class="mx-auto mb-6">
      <v-list>
        <v-list-subheader>WHISPER</v-list-subheader>
        <v-list-item prepend-icon="mdi-script-text" @click="getTranscription"
          >Read new Transcripts</v-list-item
        >
      </v-list>
    </v-card>
    <v-card class="mx-auto mb-6" title="Pipeline Timer">
      <v-list>
        <v-list-item>
          <v-slider
            v-model="timer"
            :max="240"
            :min="10"
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
          <div class="mb-6">
            <v-container>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn
                    variant="plain"
                    icon="mdi-play"
                    @click="playTimer()"
                  ></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    variant="plain"
                    @click="pauseTimer()"
                    icon="mdi-pause"
                  ></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    variant="plain"
                    @click="resetTimer()"
                    icon="mdi-stop"
                  ></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    variant="plain"
                    @click="restartTimer()"
                    icon="mdi-restart"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <v-list-item title="Auto-Repeat">
            <v-btn-toggle v-model="repeat">
              <v-btn icon="mdi-repeat"></v-btn>
            </v-btn-toggle>
          </v-list-item>
          <v-list-item>
            <v-card
              class="mx-auto mb-6"
              :loading="isActive"
              :title="'Next transcription in ' + timerComputed"
            ></v-card>
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card class="mx-auto mb-6" title="Transcriptions">
      <v-list>
        <v-list-item>
          <v-expansion-panels multiple class="mx-auto mb-6">
            <v-expansion-panel title="Last transcription">
              <v-expansion-panel-text
                >{{ transcription }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels></v-list-item
        >
        <v-list-item>
          <v-slider
            v-model="entriesAmount"
            :max="50"
            :step="2"
            label="Amount of Entries"
            hide-details
          >
            <template v-slot:append>
              <v-text-field
                v-model="entriesAmount"
                style="width: 80px"
                type="number"
                hide-details
              ></v-text-field>
            </template> </v-slider
        ></v-list-item>
        <v-list-item>
          <v-expansion-panels multiple>
            <v-expansion-panel
              :title="'Last ' + entriesAmount + ' Entries of Transcript'"
            >
              <v-expansion-panel-text>
                <div>{{ customEntries }}</div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels></v-list-item
        >
      </v-list>
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
  repeat,
  toggleAuto,
  autoprompt,
} = storeToRefs(store);

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
    if (repeat.value !== 0 && !toggleAuto) {
      isActive.value = false;
      pause();
    }
    reset();
  }
  return timer.value - counter.value + "s";
});

//bus and transcription logic
const bus = useEventBus("auto");
const getTranscription = async () => {
  const result = await $fetch("/api/getWhisperTranscript");
  transcription.value = result.content;
  console.log("get transcription");
  if (autoprompt.value === 0) {
    console.log("triggerOpenAI autoprompt active");
    bus.emit("triggerOpenAI");
  }
};
</script>
