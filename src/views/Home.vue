<template>
  <div class="home">
    <Navigator msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigator from '@/components/navigator.vue'

export default {
  name: 'Home',
  components: {
    Navigator
  }
}
</script>

    Navigator