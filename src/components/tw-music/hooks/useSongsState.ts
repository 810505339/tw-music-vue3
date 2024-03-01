import { createInjectionState } from '@vueuse/shared'
import { ISong } from '../type.ts'


type initialValue = {
  songs: Array<ISong>,
  currentIndex: number,
  audio: Ref<HTMLAudioElement | undefined>,
  isShowList: boolean,
  title: string,
  color: string,
}

const [useProvideSongsStore, useSongsStore] = createInjectionState((initialValue: initialValue) => {
  // 全局歌曲列表
  const songs = ref(initialValue.songs)
  /* 选中的音乐 */
  const currentIndex = ref(initialValue.currentIndex)
  /**找到正在播放的音乐 */
  const findCurrentSong = computed(() => {
    return songs.value[currentIndex.value]
  })
  /* 找到正在播放的音乐的src */
  const currentSrc = computed(() => {
    return findCurrentSong.value.url
  })
  /* 歌曲的信息 */
  const { playing, currentTime, duration, volume, muted, ended } = useMediaControls(initialValue.audio, {
    src: currentSrc
  })
  /* 是否展开songList */
  const isShowList = ref(initialValue.isShowList)
  /* 点击播放 */
  const play = () => {
    playing.value = true
  }
  /* 点击暂停 */
  const stop = () => {
    playing.value = false
  }
  /* 点击下一首 */
  const next = () => {
    let index = currentIndex.value
    if (index === songs.value.length - 1) {
      index = 0
    } else {
      index += 1
    }
    console.log(index, 'nextindex')
    changeCurrentIndex(index)
  }
  /* 点击上一曲 */
  const previous = () => {
    let index = currentIndex.value
    if (index === 0) {
      index = currentIndex.value
    } else {
      index -= 1
    }
    changeCurrentIndex(index)
  }
  /* 点击播放列表 */
  const changeShowList = () => {
    isShowList.value = !isShowList.value
  }



  /**
   * 修改播放的音乐
   */
  const changeCurrentIndex = (index: number) => {
    currentIndex.value = index;
    currentTime.value = 0;
    playing.value = false
    setTimeout(() => {
      playing.value = true
    })
  }

  watch(ended, () => {
    next()
  })

  return {
    currentIndex,
    findCurrentSong,
    changeCurrentIndex,
    playInfo: {
      playing,
      currentTime,
      duration,
      volume
    },
    play,
    stop,
    changeShowList,
    isShowList,
    next,
    previous,
    title: initialValue.title,
    color: initialValue.color
  }
})

export { useProvideSongsStore }
// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`
export { useSongsStore }

export function useSongsStoreWithDefaultValue() {
  return useSongsStore() ?? {
    count: ref(0),
    double: ref(0),
    increment: () => { },
  }
}

export function useCounterStoreOrThrow() {
  const counterStore = useCounterStore()
  if (counterStore == null)
    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')
  return counterStore
}
