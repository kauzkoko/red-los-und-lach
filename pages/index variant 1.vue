<template>
  <Main>
    <template #left>
      <v-container>
        <v-card
          title="Whisper"
          subtitle="Last transcription"
          :text="transcription"
        ></v-card>
      </v-container>
    </template>
    <template #middle>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-textarea
              :model-value="lyrics"
              label="Lyrics"
              rows="20"
              no-resize
              clearable
              auto-grow
              counter
              maxlength="2000"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-textarea
              :model-value="tags"
              label="Genres"
              rows="10"
              no-resize
              clearable
              counter
              required
              maxlength="160"
            ></v-textarea>
            <v-text-field
              v-model="title"
              :rules="[
                () => !!title || 'This field is required',
                () =>
                  (!!title && title.length <= 25) ||
                  'Title must be less than 25 characters',
              ]"
              counter="25"
              label="Title"
              placeholder="Rawasdada Klibi"
              required
            >
            </v-text-field>
          </v-col>
          <v-col> </v-col>
        </v-row>
      </v-container>
    </template>
    <template #right>
      <v-container>
        <v-card class="mx-auto" max-width="300">
          <v-list>
            <v-list-subheader>WHISPER</v-list-subheader>
            <v-list-item prepend-icon="mdi-script" @click="generateAudioIds"
              >Read new transcripts</v-list-item
            >
          </v-list>
        </v-card>
        <v-card class="mx-auto my-4" max-width="300">
          <v-list>
            <v-list-subheader>SUNO AI</v-list-subheader>
            <v-list-item prepend-icon="mdi-counter" @click="generateAudioIds"
              >Generate Audio Id</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-download"
              @click="generateDownloadLinkFromId"
              >Generate Download Link</v-list-item
            >
          </v-list>
        </v-card>
      </v-container>
    </template>
  </Main>
</template>

<script setup>
const lyrics = ref(
  "Ja sheppers bei dir? Ja schepperds? Ja schepperds bei dir? Was willst du von mir? Mach doch weiter. Ja sheppers bei dir? Ja schepperds? Ja schepperds bei dir? Was willst du von mir? Mach doch weiter."
);
const tags = ref("reggae traditional melancholic");
const title = ref("Ja sheppers bei dir");
const id = ref("no ids yet");
const downloadLink = ref("no link yet");
const transcription = ref("no transcription yet");

async function generateAudioIds() {
  const { data } = await useFetch("/api/generateAudioId", {
    prompt: lyrics.value,
    tags: tags.value,
    title: title.value,
    make_instrumental: false,
    wait_audio: false,
  });
  console.log(data);
}

async function generateDownloadLinkFromId() {
  const { data } = await useFetch("/api/generateAudioDownload", {
    ids: id,
  });
  console.log(data);
}
</script>
