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
            <v-list-item prepend-icon="mdi-music" @click="generateAudioAndWait"
              >Generate Audio and Wait for it</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-download"
              @click="generateDownloadLinkFromId"
              >Generate and Set Audio Url</v-list-item
            >
          </v-list>
        </v-card>
        <v-card class="mx-auto mb-6">
          <v-expansion-panels multiple>
            <v-expansion-panel title="Lyrics">
              <v-expansion-panel-text>
                <v-textarea
                  :model-value="lyrics"
                  label="Lyrics"
                  no-resize
                  clearable
                  auto-grow
                  counter
                  maxlength="2000"
                  @update:model-value="lyrics = $event"
                ></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Song specifics / Genres / Tags / Styles">
              <v-expansion-panel-text>
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
                  @update:model-value="tags = $event"
                ></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Title">
              <v-expansion-panel-text>
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
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>

        <v-card class="mx-auto mb-6">
          <!-- <v-text-field
            v-model="downloadLink"
            :rules="[() => !!title || 'This field is required']"
            label="Last AudioUrl"
            placeholder="someweirdurlsomesomesome.com/audio.mp3"
            required
          >
          </v-text-field> -->
          <v-list>
            <v-list-subheader>SONG BY ID</v-list-subheader>
            <v-list-item>
              <v-text-field
                v-model="id"
                :rules="[
                  () => !!title || 'This field is required',
                  () =>
                    (!!title && title.length <= 50) ||
                    'Title must be less than 50 characters',
                ]"
                counter="50"
                label="Id"
                placeholder="2304u0234"
                required
              >
              </v-text-field
            ></v-list-item>
            <v-list-item>
              <audio
                ref="audio"
                :src="'https://cdn1.suno.ai/' + id + '.mp3'"
                controls
              ></audio
            ></v-list-item>
          </v-list>
        </v-card>
        <v-list>
          <v-list-subheader>ALL SONGS</v-list-subheader>
          <v-list-item prepend-icon="mdi-library" @click="getAllSongs"
            >Get all songs</v-list-item
          >

          <v-list-item title="Show Songs">
            <v-text-field
              v-model="songsAmount"
              type="number"
              hide-details
            ></v-text-field>
          </v-list-item>
          <v-list-item
            v-for="(song, index) in songs.slice(0, songsAmount)"
            :title="song.title"
            :subtitle="song.id"
          ></v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const store = useGstore();
const {
  lyrics,
  genres: tags,
  title,
  id,
  genres,
  downloadLink,
  lastTitle,
  songs,
  songsAmount,
} = storeToRefs(store);

const audio = ref();
const { playing, currentTime, duration, volume } = useMediaControls(audio);
const playSong = () => {
  playing.value = true;
};
const pauseSong = () => {
  playing.value = false;
};
const stopSong = () => {
  playing.value = false;
  currentTime.value = 0;
};
const restartSong = () => {
  playing.value = false;
  currentTime.value = 0;
  playing.value = true;
};

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
  console.log(result.songs[0].id);
  id.value = result.songs[0].id;
  lastTitle.value = result.songs[0].title;
}

async function generateAudioAndWait() {
  const result = await $fetch("/api/generateAudioAndWait", {
    method: "post",
    body: {
      prompt: lyrics.value,
      tags: tags.value,
      title: title.value,
    },
  });
  console.log(result);
  downloadLink.value = result.songs[0].audioUrl;
  id.value = result.songs[0].id;
  lastTitle.value = result.songs[0].title;
}

async function generateDownloadLinkFromId() {
  const result = await $fetch("/api/generateAudioDownload", {
    method: "post",
    body: {
      id: id.value,
    },
  });
  downloadLink.value = result.songs[0].audioUrl;
  lastTitle.value = result.songs[0].title;
}

async function getAllSongs() {
  const result = await $fetch("/api/getAllSongs");
  console.log(result);
  songs.value = result.allSongs;
}
</script>
