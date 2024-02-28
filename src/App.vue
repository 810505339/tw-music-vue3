<script setup lang="ts">
import { ISong } from '@/components/tw-music/type'

const songs: ISong[] = [
    {
        name: '时间煮雨',
        url: 'http://music.163.com/song/media/outer/url?id=26562741.mp3',
        cover: 'http://p2.music.126.net/6-tqeY2U5pAePa3vKSuM5w==/19034745300240313.jpg?param=300x300',
        lyrics: '',
        artist: '郁可唯',
    },
    {
        name: '保留',
        url: 'http://music.163.com/song/media/outer/url?id=442869203.mp3',
        cover: 'http://p2.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg?param=300x300',
        lyrics: '',
        artist: '郭顶',
    },
    {
        name: '凄美的',
        url: 'http://music.163.com/song/media/outer/url?id=436346833.mp3',
        cover: 'http://p2.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg?param=300x300',
        lyrics: '',
        artist: '郭顶',
    },
    {
        name: '水星记',
        url: 'http://music.163.com/song/media/outer/url?id=441491828.mp3',
        cover: 'http://p2.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg?param=300x300',
        lyrics: '',
        artist: '郭顶',
    },
    {
        name: '此生不换',
        url: 'http://music.163.com/song/media/outer/url?id=25638340.mp3',
        cover: 'http://p2.music.126.net/UyDVlWWgOn8p8U8uQ_I1xQ==/7934075907687518.jpg?param=300x300',
        lyrics: '',
        artist: '青鸟飞鱼',
    },
]

</script>

<template>
    <!-- <button @click="playing=!playing">an</button> -->
    <!-- <audio ref="audio"></audio> -->
    <TwMusic :songs="songs" class="m-20" />
</template>

<style scoped>
</style>
