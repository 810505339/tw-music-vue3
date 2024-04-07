<script setup lang="ts">
import { IProps } from '../type';
import simplebar from 'simplebar-vue';
import { useSongsStore } from '../hooks/useSongsState';
const songsStore = useSongsStore()
const props = defineProps<IProps>()

function style(i: number) {
  return songsStore?.currentIndex.value === i ? songsStore.color : ``
}
/* 当前是否选中了歌曲并且正在播放 */
function showPause(i: number) {
  const playIng = songsStore?.playInfo.playing.value
  return playIng && songsStore?.currentIndex.value === i
}
/* 点击播放 */
function handlePlay(i: number) {
  if (i === songsStore?.currentIndex.value) {
    //是否需要换歌不需要
    songsStore.play()
  } else {
    songsStore?.changeCurrentIndex(i)
  }
}




</script>
<template>
  <simplebar h-40 rounded-b-2>
    <div divide-y>
      <div v-for="(song, index) in songs" :key="index" text-12px h-10 flex items-center justify-between px-4
        hover="bg-gray-50 " :class="[style(index), 'group']">
        <div truncate font-500 flex-auto>{{ song.name }} - {{ song.artist }}</div>
        <div hidden class="group-hover:block">
          <i i-mdi:play icon-btn v-show="!showPause(index)" @click="handlePlay(index)"></i>
          <i i-mdi:pause icon-btn v-show="showPause(index)" @click="songsStore?.stop()"></i>
        </div>
      </div>
    </div>

  </simplebar>
</template>

<style scoped>
:deep(.simplebar-vertical) {
  width: 5px;
}
</style>
