<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>
      <v-tabs color="grey-darken-2" centered v-model="tab">
        <v-tab :value="1"> All </v-tab>
        <v-tab :value="2"> Whisper </v-tab>
        <v-tab :value="3"> Open AI </v-tab>
        <v-tab :value="4"> Suno AI </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>
    <slot :tab="tab" />
  </v-app>
</template>

<script setup>
// const tab = useTab();
const store = useGstore();
const { tab } = storeToRefs(store);
</script>
