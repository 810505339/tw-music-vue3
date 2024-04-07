import Lyric, { Lines } from 'lrc-file-parser'
//useLyrics
//lrc-file-parser

const test = `[00:01.50]时间煮雨
[00:03.99]作词：郭敬明、落落
[00:06.65]作曲：武部聪志
[00:09.65]编曲：刘大江
[00:12.59]演唱：郁可唯
[00:15.30]
[00:26.42]风吹雨成花
[00:31.98]时间追不上白马
[00:37.69]你年少掌心的梦话
[00:42.61]依然紧握着吗
[00:47.67]
[00:49.07]云翻涌成夏
[00:54.51]眼泪被岁月蒸发
[01:00.20]这条路上的你我她
[01:05.18]有谁迷路了吗
[01:10.79]
[01:14.33]我们说好不分离
[01:19.01]要一直一直在一起
[01:25.61]就算与时间为敌
[01:30.16]就算与全世界背离
[01:42.02]
[01:48.15]风吹亮雪花
[01:53.70]吹白我们的头发
[01:59.28]当初说一起闯天下
[02:04.04]你们还记得吗
[02:09.13]
[02:10.66]那一年盛夏
[02:16.25]心愿许的无限大
[02:22.03]我们手拉手也成舟
[02:26.79]划过悲伤河流
[02:31.94]
[02:36.11]你曾说过不分离
[02:40.77]要一直一直在一起
[02:47.29]现在我想问问你
[02:51.99]是否只是童言无忌
[02:57.37]
[02:58.61]天真岁月不忍欺
[03:03.12]青春荒唐我不负你
[03:09.88]大雪求你别抹去
[03:14.40]我们在一起的痕迹
[03:20.50]
[03:21.32]大雪也无法抹去
[03:25.75]我们给彼此的印记
[03:32.50]今夕何夕
[03:38.11]青草离离
[03:43.84]明月夜送君千里
[03:48.84]等来年 秋风起
[03:55.39]`

export default () => {
  const playlines = ref<string>('')

  var lrc = new Lyric({
    onPlay: function (line, text) { // Listening play event
      console.log(line, text) // line is line number of current play
      console.log(text, 'text')
      playlines.value = text
      // text is lyric text of current play line
    },
    onSetLyric: function (lines) { // listening lyrics seting event

    },
    offset: 150, // offset time(ms), default is 150 ms
    playbackRate: 1, // playback rate, default is 1
    isRemoveBlankLine: true // is remove blank line, default is true
  })


  function setLyric(lyric: string) {
    lrc.setLyric(lyric)
  }

  function playLyric(curTime: number) {
    console.log(curTime, 'curTime')
    lrc.play(curTime * 1000)
  }

  function pauseLyric() {
    lrc.pause()
  }
  return {
    setLyric,
    playLyric,
    pauseLyric,
    playlines,
  }
}
