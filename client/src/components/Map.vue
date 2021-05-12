<template>
  <div class="ymap-container" >
    <yandex-map
      ref="map"
      :coords="coords"
      :zoom="10"
      :controls="controlArr"
      :detailed-controls="contolOpt"
      @click="test"
      >
      <!-- <ymap-marker
      :coords="GET_NewMarkerCoords()"
      v-if="GET_NewMarker()"
      marker-id="newMarker"
      hint-content="some hint"
      /> -->
      <template v-for="sites in SITES()">
      <ymap-marker
      :coords="sites.latlng"
      :key="sites.id"
      :marker-id="sites.id"
      :hint-content="sites.name"
      @click="OpenDialogSites(sites.id)"
      />
      </template>

    </yandex-map>
      <DialogNewMarker :dialogNewMarker="addNewMarkerDialog" @closeNewMarker="closeDialog"/>
      <Form :dialogSites="dialogSite" :siteId="siteId" @closeSites="test2"/>
  </div>
</template>

<script>
// //  :balloon-template="balloonTemplate(sites.name, sites.photos, sites.description,
//        sites.operating_hours, sites.operating_hours_date, sites.tickets)"
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex';
import DialogNewMarker from './FormNewMarker.vue';
import Form from './FormSites.vue';

export default {
  name: 'Map',
  props: ['addNewMarker'],
  components: {
    DialogNewMarker,
    Form,
  },
  data: () => ({
    coords: [
      54.82896654088406,
      39.831893822753904,
    ],
    dialogSite: false,
    newMarker: false,
    controlArr: [
      'geolocationControl',
      'trafficControl',
      'zoomControl',
    ],
    contolOpt: {
      geolocationControl: {
        float: 'right',
        floatIndex: 0,
      },
      zoomControl: {
        float: 'none',
        position: {
          right: '10px',
          top: '100px',
        },
      },
    },
    addNewMarkerDialog: false,
    siteId: null,
  }),
  methods: {
    ...mapGetters([
      'GET_NewMarker',
      'GET_NewMarkerCoords',
      'SITES',
    ]),
    ...mapActions([
      'SET_NEW_MARKER_COORDS',
      'UPD_NEW_MARKER',
    ]),
    closeDialog() {
      this.addNewMarkerDialog = false;
      this.SET_NEW_MARKER_COORDS(Array);
      this.UPD_NEW_MARKER();
    },
    test(e) {
      if (this.GET_NewMarker()) {
        this.addNewMarkerDialog = true;
        this.SET_NEW_MARKER_COORDS(e.get('coords'));
      }
    //   const coursor = this.$refs.map.myMap.cursors.push('help');
    //   console.log(this.$refs.map.myMap.cursors);
    //   setTimeout(() => {
    //     coursor.remove();
    //   }, 2000);
    },
    test2() {
      // this.$refs.map.$children[0].myMap.cursors.push('help');
      // this.UPD_NEW_MARKER();
      // this.snackbar = true;
      // console.log();
      this.dialogSite = false;
    },
    balloonTemplate(name, photos, description, operatingHours, operatingHoursDate, tickets) {
      return `
        <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >


    <img
      height="250"
      src="https://img.tourister.ru/files/2/7/3/3/6/6/0/2/clones/300_200_thumb.jpg"
    ></img>

    <v-card-title>${name}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>


      <div>${description}</div>
    </v-card-text>



    <v-card-title>${operatingHours} <br> ${operatingHoursDate} <br> ${tickets} </v-card-title>
              <v-btn
            color="blue darken-1"
            text
            @click="test"
          >
            Save
          </v-btn>
  </v-card>
      `;
    },
    OpenDialogSites(id) {
      this.siteId = id;
      this.dialogSite = true;
    },
  },
  created() {
    console.log(this.SITES());
  },
};
</script>
