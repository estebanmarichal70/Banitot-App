
<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                
                    <register-jwt></register-jwt>
            </vx-card>
        </div>
    </div>
</template>

<script>
import RegisterJwt from './RegisterJWT.vue'

export default {
  components: {
    RegisterJwt
  }
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
