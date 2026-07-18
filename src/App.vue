<template>
  <div id="app" class="app-shell" v-bind:class="{ 'is-waiting': flagStart === 0, 'is-embedded': embedMode }">
    <div class="hero-row" v-if="!embedMode">
      <img src="cardio/banner_prime.png" class="hero-banner" alt="Cardio banner">
    </div>

    <div class="content-stage">
      <div class="content-card">
        <input-lvl
        v-if="flagStart === 0"
        v-bind:initialHiit="hiit"
        v-bind:initialWarmup="warmup"
        v-on:start="activeStart"/>

        <timer-cardio
        v-if="flagStart === 1"
        v-bind:warmupFlag="warmup"
        v-bind:hiit="hiit"
        v-bind:flagStartProp="flagStart"/>
      </div>
    </div>
  </div>
</template>

<script>
import inputLvl from './components/inputLvl.vue';
import timerCardio from './components/timerCardio.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Cardio with Njk',
      //HIIT
      hiit: {
        time: 30,
        rest: 60,
        round: 8
      },
      warmup: true,
      embedMode: false,

      //flag
      flagStart: 0
    }
  },

  mounted() {
    this.applyConfigFromQuery();
    this.syncBodyMode();
  },

  components: {
    inputLvl,
    timerCardio
  },

  methods: {
    syncBodyMode() {
      if (document && document.body) {
        document.body.classList.toggle('embedded-mode', this.embedMode);
      }
    },

    normalizeHiit(input) {
      var source = input || {};
      return {
        time: this.parsePositiveInt(source.time, 30),
        rest: this.parsePositiveInt(source.rest, 60),
        round: this.parsePositiveInt(source.round, 8)
      };
    },

    parsePositiveInt(value, fallback) {
      var parsed = parseInt(value, 10);
      if (Number.isNaN(parsed) || parsed < 1) {
        return fallback;
      }
      return parsed;
    },

    parseBoolean(value, fallback) {
      if (value === null || value === undefined || value === '') {
        return fallback;
      }
      var normalized = String(value).toLowerCase();
      if (['1', 'true', 'yes', 'y', 'on'].indexOf(normalized) >= 0) {
        return true;
      }
      if (['0', 'false', 'no', 'n', 'off'].indexOf(normalized) >= 0) {
        return false;
      }
      return fallback;
    },

    readQueryConfig() {
      if (!window || !window.location || !window.location.search) {
        return null;
      }

      var params = new URLSearchParams(window.location.search);

      var timeRaw = params.get('time') || params.get('work') || params.get('exercise');
      var restRaw = params.get('rest') || params.get('break');
      var roundRaw = params.get('round') || params.get('rounds') || params.get('set') || params.get('sets');
      var warmupRaw = params.get('warmup');
      var autoStartRaw = params.get('autostart');

      var hasConfig = (timeRaw !== null) || (restRaw !== null) || (roundRaw !== null) || (warmupRaw !== null);
      if (!hasConfig) {
        return null;
      }

      var hiitConfig = {
        time: this.parsePositiveInt(timeRaw, this.hiit.time || 30),
        rest: this.parsePositiveInt(restRaw, this.hiit.rest || 60),
        round: this.parsePositiveInt(roundRaw, this.hiit.round || 8)
      };

      return {
        hiit: hiitConfig,
        warmup: this.parseBoolean(warmupRaw, this.warmup),
        autoStart: this.parseBoolean(autoStartRaw, true),
        embedMode: true
      };
    },

    applyConfigFromQuery() {
      var queryConfig = this.readQueryConfig();
      if (!queryConfig) {
        return;
      }

      this.hiit = this.normalizeHiit(queryConfig.hiit);
      this.warmup = queryConfig.warmup;
      this.embedMode = queryConfig.embedMode;
      this.syncBodyMode();

      if (queryConfig.autoStart) {
        this.flagStart = 1;
        window.startF = 1;
        if (window.__cardioSyncWakeLock) {
          window.__cardioSyncWakeLock();
        }
      }
    },

    activeStart(data){
      window.startF = data.flag;
      if (window.__cardioSyncWakeLock) {
        window.__cardioSyncWakeLock();
      }
      this.flagStart = data.flag;
      this.warmup = data.warmup;
      this.hiit = this.normalizeHiit(data.hiit);
    }
  }

}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'sportrop regular', 'Share Tech Mono', monospace;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 0 20px rgb(217, 221, 223),  0 0 20px rgba(217, 221, 223, 0);
}

body {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
  background: radial-gradient(ellipse at center,  #242424  0%, #0c0c0e 70%);
}

body.embedded-mode {
  padding: 0;
}

#app {
  width: min(920px, 100%);
}

.app-shell {
  margin: 0 auto;
  min-height: calc(100vh - 16px);
  padding-top: clamp(10px, 2.8vh, 28px);
  display: flex;
  flex-direction: column;
}

.app-shell.is-embedded {
  width: 100%;
  max-width: none;
  min-height: 100%;
  padding-top: 0;
}

.hero-row {
  margin-bottom: 8px;
  flex: 0 0 auto;
}

.hero-banner {
  width: 100%;
  max-width: 760px;
  height: auto;
  margin: 0 auto;
  display: block;
}

.content-stage {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.app-shell.is-embedded .content-stage {
  align-items: stretch;
}

.content-card {
  width: 100%;
  margin: 0 auto;
  padding: 10px 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(4, 8, 12, 0.48);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
}

.app-shell.is-embedded .content-card {
  height: 100%;
  margin: 0;
}

p {
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: inherit;
}

pre {
    background-color: transparent;
    border: None;
}

@media only screen and (max-width: 700px) {
  body {
    padding: 6px;
  }

  .app-shell {
    min-height: calc(100vh - 12px);
    padding-top: 8px;
  }

  .app-shell.is-embedded {
    min-height: 100vh;
  }

  .content-card {
    border-radius: 12px;
    padding: 6px 6px 10px;
  }
}
</style>
