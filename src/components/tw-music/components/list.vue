<script setup lang="ts">
import { IProps } from '../type';
import simplebar from 'simplebar-vue';
defineProps<IProps>()
</script>
<template>
  <simplebar  h-40 rounded-b-2 >
    <div divide-y>
      <div v-for="(song,index) in songs" :key="index" text-12px h-10  flex items-center justify-between px-2
        hover="bg-gray-50 "
      >
      <div truncate font-500 flex-auto >{{song.name}} - {{song.artist}}</div>
      <div>
        <i i-mdi:play icon-btn></i>
        <i i-mdi:pause icon-btn></i>
      </div>
    </div>
    </div>
   
  </simplebar>
</template>
