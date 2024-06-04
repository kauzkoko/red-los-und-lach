export const useGstore = defineStore("Gstore", {
  state: () => {
    return {
      toggleAuto: 0,
      tab: 1,
      lastTranscription: "last l",
      lyrics: "last l",
      genres: "last g",
      title: "last t",
      timer: 30,
      repeat: null,
      autoplay: null,
      autoprompt: null,
      entriesAmount: 10,
      isActive: false,
      gptOutput: mockedLyrics,
      functionOutput: mockedFunctionOutput,
      songSpecifics: "hässigen und frechen",
      prompt:
        "Erstelle die Lyrics, das Genre und den Titel für einen Song basierend auf dem folgenden Transkript eines Gesprächs zwischen Personen auf einer Parkbank. Das Transkript enthält sowohl die eins zu eins Übersetzung eines Gesprächs, als auch Metainformationen über den Kontext der Aufnahme wie z.B. Vogelgezwitscher. Beziehe diese Informationen in die Lyrics ein und gestalte einen XXX Song. Zitiere einige Stellen des Transkripts in den Lyrics. Ignoriere die folgenden Einträge im Transkript für die Lyrics: Untertitelung des ZDF, 2020, Amen, Vielen Dank. Diese Einträge sind nicht Teil des Gesprächs und des Kontexts.",
      id: "d9e083d5-7e97-42d9-9546-0a7f8831778e",
      downloadLink:
        "https://cdn1.suno.ai/d9e083d5-7e97-42d9-9546-0a7f8831778e.mp3",
      lastTitle: "Last Title",
      test: "teswert",
      songsAmount: 3,
      locked: false,
      songs: [
        {
          title: "mockedlast t",
          id: "mockedd9e083d5-7e97-42d9-9546-0a7f8831778e",
          audioUrl: "https://cdn1.suno.ai/mocked.mp3",
        },
        {
          title: "mockedlast t",
          id: "mockedd9e083d5-7e97-42d9-9546-0a7f8831778e",
          audioUrl: "https://cdn1.suno.ai/mocked.mp3",
        },
        {
          title: "mockedlast t",
          id: "mockedd9e083d5-7e97-42d9-9546-0a7f8831778e",
          audioUrl: "https://cdn1.suno.ai/mocked.mp3",
        },
      ],
    };
  },
  getters: {
    customEntries: (state) =>
      state.lastTranscription
        .split("\n")
        .slice(-state.entriesAmount - 1)
        .join(" "),
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
