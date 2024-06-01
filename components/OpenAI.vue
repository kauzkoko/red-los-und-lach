<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto mb-6">
          <v-list>
            <v-list-subheader>OPEN AI</v-list-subheader>
            <v-list-item prepend-icon="mdi-text" @click="generateGptOutput"
              >Generate Lyrics from Transcript</v-list-item
            >
            <v-list-item
              prepend-icon="mdi-mouse"
              @click="generateFunctionArguments"
              >Generate SunoAI suitable JSON</v-list-item
            >
          </v-list>
        </v-card>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel title="Prompt" value="prompt">
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
const prompt = ref(
  "Erstelle die Lyrics, das Genre und den Titel für einen Song basierend auf dem folgenden Transkript eines Gesprächs zwischen Personen auf einer Parkbank. Das Transkript enthält sowohl die eins zu eins Übersetzung eines Gesprächs, als auch Metainformationen über den Kontext der Aufnahme wie z.B. Vogelgezwitscher. Beziehe diese Informationen in die Lyrics ein und gestalte einen XXX Song. Ignoriere die folgenden Einträge im Transkript für die Lyrics: Untertitelung des ZDF, 2020, Amen, Vielen Dank. Diese Einträge sind nicht Teil des Gesprächs und des Kontexts."
);
const songSpecifics = ref("hässigen und frechen");
const latestTranscript = useTranscription();
const gptOutput = ref(mockedLyrics);
const functionOutput = ref("structured lyrics mock");

const generateGptOutput = async () => {
  const songSpecificsString = songSpecifics.value;
  const promptString = prompt.value;
  const songSpecificsIndex = promptString.indexOf("XXX");
  const newPrompt =
    promptString.slice(0, songSpecificsIndex) +
    songSpecificsString +
    promptString.slice(songSpecificsIndex + 3);
  const result = await $fetch("/api/getLyricsFromTranscript", {
    method: "post",
    body: { prompt: newPrompt, transcript: latestTranscript.value },
  });
  console.log(result.lyrics);
  gptOutput.value = result.lyrics;
};

const generateFunctionArguments = async () => {
  const result = await $fetch("/api/createSunoFunction", {
    method: "post",
    body: { gptOutput: gptOutput.value },
  });
  functionArguments.value = result.functionArguments;
  let parsedJson = JSON.parse(result.functionArguments);
  useLyrics.value = parsedJson.lyrics;
  useGenres.value = parsedJson.genres;
  useTitle.value = parsedJson.title;
};
</script>
