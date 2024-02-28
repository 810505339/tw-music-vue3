<script setup lang="ts">
  const props=defineProps<{
    img:string
  }>()
</script>
<template>
    <div absolute  rounded-full w-18 h-18 left-3 bottom-3 >
      <img :src="props.img" rounded-full  />
    </div>
</template>
