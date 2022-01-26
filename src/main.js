import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

/*----------------------------------------------------------------------
Prevent Lock Screen on mobile
- first event: click
- second event: hide tab
----------------------------------------------------------------------*/
var checkScreen = 0;
document.addEventListener('click', async () => {
  if (('wakeLock' in navigator) && (checkScreen == 0)) {
      checkScreen = 1;
      let screenLock = await navigator.wakeLock.request('screen');
  };
});

document.addEventListener('visibilitychange', async () => {
  if ('wakeLock' in navigator) {
      let screenLock = await navigator.wakeLock.request('screen');
  };
});


