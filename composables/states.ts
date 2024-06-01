export const useTab = () => useState<number>("tab", () => 1);
export const useTranscription = () =>
  useState<string>(
    "lastTranscription",
    () =>
      "Vielen Dank. Amen. Vielen Dank. Vielen Dank. Vielen Dank. Hörst du mich jetzt? Da ist... Oh mein Gott. Okay, das ist krass. Okay, das ist krass. Easy, easy. Machen wir uns einen zu. Machen wir uns halt so. Ja, fair. ja heißt, ich Echt? Gut, perfekt. So, dieser Super So, die sind super. Vielen Dank. Untertitelung des ZDF, 2020"
  );
export const useLyrics = () =>
  useState<string>(
    "lastLyrics",
    () =>
      "Ja sheppers bei dir? Ja schepperds? Ja schepperds bei dir? Was willst du von mir? Mach doch weiter. Ja sheppers bei dir? Ja schepperds? Ja schepperds bei dir? Was willst du von mir? Mach doch weiter."
  );

export const useGenres = () =>
  useState<string>("lastGenres", () => "reggae traditional melancholic");

export const useTitle = () =>
  useState<string>("lastTitle", () => "Bei dem schepperds");
