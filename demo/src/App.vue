<template>
  <router-view />
</template>

<style>
:root {
  --background-primary: #1a1a1a;
  --background-primary-alt: #0d0b12;
  --background-secondary: #212121;
  --background-secondary-alt: #0d0b12;
  --background-trans: rgba(255, 255, 255, 0.15);
  --skeleton-bg: #2e2e2e;
  --skeleton-hl: #363636;
  --text-bright: #fff;
  --text-normal: #bebebe;
  --text-accent: #0fb6d6;
  --text-sub-accent: #f4569d;
  --text-dim: #45aaff;
  --text-faint: #7aa2f7;
  --text-title-h1: var(--text-accent);
  --text-title-h2: #cbdbe5;
  --text-title-h3: #cbdbe5;
  --text-title-h4: #cbdbe5;
  --text-title-h5: #cbdbe5;
  --text-link: #b4b4b4;
  --text-a: #6bcafb;
  --text-a-hover: #6bcafb;
}
body {
  background: var(--background-primary);
  color: var(--text-normal);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
