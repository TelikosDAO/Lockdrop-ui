<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  }
};
</script>
<style>
@font-face {
  font-family: "Olga";
  src: local("Olga"),
   url('/Olga.ttf') format("truetype");
}

@font-face {
  font-family: "Zekton";
  src: local("Zekton"),
   url('/zekton.ttf') format("truetype");
}
</style>