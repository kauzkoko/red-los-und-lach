<template>
  <Main>
    <template #left v-if="showAll">
      <Whisper />
    </template>
    <template #middle>
      <OpenAI v-if="showAll || showOpenAI" />
      <Whisper v-if="showWhisper" />
      <SunoAI v-if="showSunoAI" />
    </template>
    <template #right v-if="showAll">
      <SunoAI />
    </template>
  </Main>
</template>

<script setup>
const tab = useTab();
const showAll = computed(() => tab.value === 1);
const showWhisper = computed(() => tab.value === 2);
const showOpenAI = computed(() => tab.value === 3);
const showSunoAI = computed(() => tab.value === 4);
</script>
