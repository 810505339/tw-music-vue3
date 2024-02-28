import { createInjectionState } from '@vueuse/shared'
import { ISong } from '../type.ts'
import { log } from 'console'

type initialValue = {
  songs: Array<ISong>,
  currentIndex: number,
  audio: Ref<HTMLAudioElement | undefined>,
  isShowList: boolean
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

  const currentSrc = computed(() => {
    return findCurrentSong.value.url
  })
  /* 歌曲的信息 */
  const { playing, currentTime, duration, volume, waiting, muted } = useMediaControls(initialValue.audio, {
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
    if (index === songs.value.length) {
      index = 0
    } else {
      index += 1
    }
    console.log(index, 'nextindex')
    changeCurrentIndex(index)
  }

  const previous = () => {
    let index = currentIndex.value
    if (index === 0) {
      index = currentIndex.value
    } else {
      index -= 1
    }
    changeCurrentIndex(index)
  }

  const changeShowList = () => {
    isShowList.value = !isShowList.value
  }


  /**
   * 修改播放的音乐
   */
  const changeCurrentIndex = (index: number) => {
    console.log(waiting.value, 'index')
    currentIndex.value = index;
    currentTime.value = 0;
    console.log(findCurrentSong.value)
    play();
  }

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
