<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-tabs color="grey-darken-2" v-model="tab">
        <v-tab :value="1"> All </v-tab>
        <v-tab :value="2"> Whisper </v-tab>
        <v-tab :value="3"> Open AI </v-tab>
        <v-tab :value="4"> Suno AI </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn-toggle mandatory v-model="toggleAuto">
        <v-btn>Debug</v-btn>
        <v-btn>Auto</v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <slot :tab="tab" />
  </v-app>
</template>

<script setup>
// const tab = useTab();
const store = useGstore();
const { tab, toggleAuto, repeat, autoplay, autoprompt } = storeToRefs(store);
watch(toggleAuto, (newVal) => {
  if (newVal) {
    repeat.value = 0;
    autoplay.value = 0;
    autoprompt.value = 0;
  } else {
    repeat.value = undefined;
    autoplay.value = undefined;
    autoprompt.value = undefined;
  }
});
</script>
