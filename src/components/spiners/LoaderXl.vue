<template>
  <div class="flex items-center space-x-4">
    <div id="loading"></div>
    <p class="hidden xl:block text-6xl text-black-accent dark:text-d-white">Loading......</p>
  </div>
</template>

<style scoped>
  #loading {
    display: inline-block;
    width: 90px;
    height: 90px;
    border: 10px solid rgb(184 185 193 / 0.2);
    border-radius: 50%;
    border-top-color: #7586ec;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
</style>