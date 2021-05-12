<template>
  <v-app id="inspire" >
    <div >
    <div class="float-right">
      <v-btn
          icon
          v-if="LOGIN().length == 0"
          x-large
          @click="dialogLogin = !dialogLogin"
        >
          <v-icon>mdi-account-box</v-icon>
        </v-btn>
        <div class="" v-else>
          <UserInfo />
        <v-btn
          x-large
          @click="LOGOUT()"
        >
          Выйти
        </v-btn>
        </div>

    </div>
  </div>
    <Map ref="map" />
    <v-main style="z-index: 5;  position: fixed" >
      <div class="d-inline-flex flex-column ml-8 mt-15">

      <v-toolbar
        dense
        floating
        max-width="500"
      >
       <v-select
        v-model="selection"
        :items="CATEGORY()"
        @change="filterSite"
        item-text="category"
        item-value="id"
        multiple
        class="mt-3"
        label="Select an option"
      >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item.category }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >
          (+{{ selection.length - 1 }} others)
        </span>
      </template>
      </v-select>
      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>

    </v-toolbar>
      <v-card
      max-width="800"
      class="mx-auto"
    >
    </v-card>
    </div>
    </v-main>
    <v-btn
    style="z-index: 5;
          position: fixed;
          right: 20px;
          bottom: 50px;"
          @click="test"

          >
        Добавить новый объекта
    </v-btn>
    <v-snackbar
      :timeout="timeout"
      :value="snackbar"
      absolute
      centered
      elevation="24"

    >
      Lorem ipsum dolor sit amet consectetur.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <Login :dialogLogin="dialogLogin" @closeLogin="closeLogin"/>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Map from './components/Map.vue';
import Login from './components/UserForms/LoginRegister.vue';
import UserInfo from './components/UserForms/UserInfo.vue';

export default {
  name: 'App',

  components: {
    Map,
    Login,
    UserInfo,
  },

  data: () => ({
    drawer: null,
    addNewMarker: false,
    snackbar: false,
    dialogLogin: false,
    timeout: 2000,
    selection: [],
  }),
  methods: {
    ...mapActions([
      'UPD_NEW_MARKER',
      'GET_CATEGORY',
      'GET_SITES',
      'JWT_TOKEN_FROM_LOCAL',
      'LOGOUT',
    ]),
    ...mapGetters([
      'GET_NewMarker',
      'CATEGORY',
      'LOGIN',
    ]),
    test() {
      // this.$refs.map.$children[0].myMap.cursors.push('help');
      this.UPD_NEW_MARKER();
      this.snackbar = true;
      // console.log();
    },
    closeLogin() {
      this.dialogLogin = false;
    },
    cancelAll() {
      console.log('object');
      this.UPD_NEW_MARKER();
    },
    filterSite(e) {
      this.GET_SITES(e.join());
    },
  },
  async created() {
    await this.GET_CATEGORY();
    await this.JWT_TOKEN_FROM_LOCAL();

    // await this.GET_SITES();
  },
};
</script>

<style>
#inspire {
  width: 100%;
  height: 100vh;
}
.ymap-container {
  height: 100%;
  z-index: 1;
  position: relative;
}

</style>
