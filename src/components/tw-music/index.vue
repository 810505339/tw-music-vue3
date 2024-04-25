<script setup lang="ts">
import { IProps } from './type';
import Cover from './components/cover.vue'
import Context from './components/contont.vue'
import List from './components/list.vue'
import { useProvideSongsStore, useSongsStore } from './hooks/useSongsState.ts'
const props = defineProps<IProps>()
const box = ref<HTMLElement>()
const { isOutside } = useMouseInElement(box)
const audio = ref<HTMLAudioElement>()

useProvideSongsStore({
    currentIndex: 0,
    songs: props.songs,
    audio: audio,
    isShowList: false,
    title: props.title || '',
    color: props.color || ''
})

const songsStore = useSongsStore()

console.log(songsStore?.playInfo);


const boxStyle = computed(() => {
    return songsStore?.isShowList.value ? `border-t` : ``
})
</script>
<template>
    <div w-82 shadow-md rounded-2>
        <div h-18 relative box-border ref="box" font-sans>
            <Cover :img="songsStore?.findCurrentSong.value.cover" />
            <Context :is-hover="!isOutside" />
        </div>
        <List :songs="props.songs" :class="[boxStyle]" v-show="songsStore?.isShowList.value" />
    </div>

    <audio ref="audio" />
</template>
