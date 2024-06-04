<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto mb-6">
          <v-list>
            <v-list-subheader>OPEN AI</v-list-subheader>
            <v-list-item
              prepend-icon="mdi-script-text-play"
              @click="generateGptOutput"
              >Generate Lyrics from whole Transcript</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-creation"
              @click="generateGptOutputFromCustomEntries"
              >Generate Lyrics from Custom Entries</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-code-json"
              @click="generateFunctionArguments"
              >Generate SunoAI suitable JSON</v-list-item
            >
            <v-list-item prepend-icon="mdi-share-all" @click="generateBoth"
              >Generate Lyrics and JSON from Custom</v-list-item
            >
            <v-list-item title="Autoprompt">
              <v-btn-toggle v-model="autoprompt">
                <v-btn icon="mdi-repeat"></v-btn>
              </v-btn-toggle>
            </v-list-item>
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
                maxlength="1400"
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
          <v-expansion-panels>
            <v-expansion-panel title="GPT-4o generated output">
              <v-expansion-panel-text>
                <v-textarea
                  :model-value="gptOutput"
                  label="GPT-4o generated output"
                  no-resize
                  auto-grow
                  clearable
                  counter
                  maxlength="3000"
                  @update:model-value="gptOutput = $event"
                ></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- <v-expansion-panel
            title="GPT-4o generated output"
            :text="gptOutput"
          /> -->
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
  autoprompt,
  autoplay,
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
  const parsedJson = JSON.parse(result.functionArguments);
  if (!parsedJson.message) {
    lyrics.value = parsedJson.lyrics;
    genres.value = parsedJson.genres;
    title.value = parsedJson.title;
  }
  // let parsedJson = JSON.parse(result.functionArguments);
  // lyrics.value = parsedJson.lyrics;
  // genres.value = parsedJson.genres;
  // title.value = parsedJson.title;
};

const generateBoth = async () => {
  await generateGptOutputFromCustomEntries();
  if (
    gptOutput.value !== "Keine Lyrics" &&
    gptOutput.value !== "Keine Lyrics." &&
    gptOutput.value !== "keine Lyrics" &&
    gptOutput.value !== "keine Lyrics."
  ) {
    await generateFunctionArguments();
  }
};

const bus = useEventBus("auto");
const checkTrigger = async (message) => {
  console.log("checktrigger in openai");
  if (message === "triggerOpenAI") {
    console.log(message);
    await generateBoth();
    if (autoplay.value === 0) {
      console.log("triggerSuno autoplay active");
      bus.emit("triggerSuno");
    }
  }
};
const unsubscribe = bus.on(checkTrigger);
</script>
