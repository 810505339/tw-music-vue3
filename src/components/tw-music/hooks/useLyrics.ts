import Lyric from 'lrc-file-parser'
//useLyrics
//lrc-file-parser


export default () => {
  const playlines = ref<string>('')

  var lrc = new Lyric({
    onPlay: function (line, text) { // Listening play event
      console.log(line, text) // line is line number of current play
      console.log(text, 'text')
      playlines.value = text
      // text is lyric text of current play line
    },
    onSetLyric: function () { // listening lyrics seting event

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
