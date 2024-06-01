<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto mb-6">
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
        <v-textarea
          :model-value="lyrics"
          label="Lyrics"
          no-resize
          clearable
          auto-grow
          counter
          maxlength="2000"
        ></v-textarea>
        <v-textarea
          :model-value="tags"
          label="Genres"
          no-resize
          clearable
          counter
          required
          rows="3"
          maxlength="100"
          auto-grow
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
        <v-card class="mx-auto mb-6">
          <v-list>
            <v-list-subheader>SONGS</v-list-subheader>
            <v-list-item prepend-icon="mdi-script" @click="getLastFiveSongs()"
              >Get last 5 songs</v-list-item
            >
            <v-list-item prepend-icon="mdi-music">
              Song title
              <v-btn
                variant="plain"
                icon="mdi-play"
                @click="playSong()"
              ></v-btn>
              <v-btn
                variant="plain"
                @click="pauseSong()"
                icon="mdi-pause"
              ></v-btn>
              <v-btn
                variant="plain"
                @click="stopSong()"
                icon="mdi-stop"
              ></v-btn>
              <v-btn
                variant="plain"
                @click="restartSong()"
                icon="mdi-restart"
              ></v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const lyrics = useLyrics();
const tags = useGenres();
const title = useTitle();
const id = ref("no ids yet");
const downloadLink = ref("no link yet");

async function generateAudioIds() {
  const result = await $fetch("/api/generateAudioId", {
    method: "post",
    body: {
      prompt: lyrics.value,
      tags: tags.value,
      title: title.value,
    },
  });
  console.log(result);
}

async function generateDownloadLinkFromId() {
  const result = await $fetch("/api/generateAudioDownload", {
    method: "post",
    body: {
      ids: id,
    },
  });
  console.log(result);
}

async function getLastFiveSongs() {
  const result = await $fetch("/api/getLastFiveSongs", {
    ids: id,
  });
  console.log(result);
}
</script>
