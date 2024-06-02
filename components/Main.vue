<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" v-if="showAll" :md="4">
          <v-sheet rounded="lg">
            <slot name="left"></slot>
          </v-sheet>
        </v-col>

        <v-col cols="12" :md="showAll ? 4 : 12">
          <v-sheet rounded="lg">
            <slot name="middle" />
          </v-sheet>
        </v-col>

        <v-col cols="12" v-if="showAll" md="4">
          <v-sheet rounded="lg">
            <slot name="right"></slot>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
const store = useGstore();
const { tab } = storeToRefs(store);
const showAll = computed(() => tab.value === 1);
</script>
