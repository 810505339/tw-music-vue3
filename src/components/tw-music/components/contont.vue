<script setup lang="ts">
import { useSongsStore } from '../hooks/useSongsState';
const songsStore = useSongsStore()

const playlines = computed(() => songsStore?.playlines.value)

const isPlayIcon = computed(() => {
  return !songsStore?.playInfo.playing.value ? `i-mdi:play-circle` : `i-mdi:pause-circle`
})
const props = defineProps<{
  isHover: boolean
}>()

function play() {
  if (songsStore?.playInfo.playing.value) {
    songsStore?.stop()
  } else {
    songsStore?.play()
  }
}

</script>
<template>

  <div pl-24 flex items-center justify-center h-full>
    <div text-30px flex-auto flex items-center justify-between pr-5 v-if="props.isHover">
      <i i-mdi:skip-previous icon-btn @click="songsStore?.previous()"></i>
      <i icon-btn @click="play" :class="[songsStore?.color, isPlayIcon]"></i>
      <i i-mdi:skip-next icon-btn @click="songsStore?.next()"></i>
      <i i-mdi:playlist-music text-20px icon-btn @click="songsStore?.changeShowList"></i>
    </div>

    <div v-else>
      <div px-5 text-center>{{ songsStore?.findCurrentSong.value.name }}</div>
      <div whitespace-nowrap px-5 overflow-auto text-xs text-center>{{ playlines }}</div>
    </div>

  </div>
</template>
