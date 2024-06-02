<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto mb-6">
          <v-list>
            <v-list-subheader>OPEN AI</v-list-subheader>
            <v-list-item prepend-icon="mdi-text" @click="generateGptOutput"
              >Generate Lyrics from whole Transcript</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-creation"
              @click="generateGptOutputFromCustomEntries"
              >Generate Lyrics from Custom Entries</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-mouse"
              @click="generateFunctionArguments"
              >Generate SunoAI suitable JSON</v-list-item
            >
          </v-list>
        </v-card>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel title="Prompt">
            <v-expansion-panel-text>
              <v-textarea
                :model-value="prompt"
                label="Prompt"
                no-resize
                auto-grow
                clearable
                counter
                required
                maxlength="800"
                @update:model-value="prompt = $event"
              ></v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Song specifics">
            <v-expansion-panel-text>
              <v-textarea
                :model-value="songSpecifics"
                label="Song specifics"
                no-resize
                clearable
                counter
                rows="2"
                auto-grow
                maxlength="50"
                @update:model-value="songSpecifics = $event"
              ></v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            title="GPT-4o generated output"
            :text="gptOutput"
          />
          <v-expansion-panel
            title="GPT-4o function JSON output"
            :text="functionOutput"
          />
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const panel = ref([]);
const store = useGstore();
const {
  lastTranscription: latestTranscript,
  gptOutput,
  functionOutput,
  songSpecifics,
  prompt,
  lyrics,
  genres,
  title,
  customEntries,
} = storeToRefs(store);

const generateGptOutput = async () => {
  const songSpecificsString = songSpecifics.value;
  const promptString = prompt.value;
  const songSpecificsIndex = promptString.indexOf("XXX");
  const newPrompt =
    promptString.slice(0, songSpecificsIndex) +
    songSpecificsString +
    promptString.slice(songSpecificsIndex + 3);
  const result = await $fetch("/api/getGptOutputFromTranscript", {
    method: "post",
    body: { prompt: newPrompt, transcript: latestTranscript.value },
  });
  console.log(result.lyrics);
  gptOutput.value = result.lyrics;
};

const generateGptOutputFromCustomEntries = async () => {
  const songSpecificsString = songSpecifics.value;
  const promptString = prompt.value;
  const songSpecificsIndex = promptString.indexOf("XXX");
  const newPrompt =
    promptString.slice(0, songSpecificsIndex) +
    songSpecificsString +
    promptString.slice(songSpecificsIndex + 3);
  const result = await $fetch("/api/getGptOutputFromTranscript", {
    method: "post",
    body: { prompt: newPrompt, transcript: customEntries.value },
  });
  console.log(result.gptOutput);
  gptOutput.value = result.gptOutput;
};

const generateFunctionArguments = async () => {
  const result = await $fetch("/api/createSunoFunction", {
    method: "post",
    body: { gptOutput: gptOutput.value },
  });
  console.log(result.functionArguments);
  functionOutput.value = result.functionArguments;
  let parsedJson = JSON.parse(result.functionArguments);
  lyrics.value = parsedJson.lyrics;
  genres.value = parsedJson.genres;
  title.value = parsedJson.title;
};
</script>
