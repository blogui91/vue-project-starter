<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout
      ref="layout"
      view="lHh Lpr fff"
      :left-class="{'bg-grey-2': true}"
    >
      <q-toolbar slot="header" color="black" class="-glossy">
        <q-btn
          flat
          @click="$refs.layout.toggleLeft()"
          v-if="currentUser"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Carbono App
          <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
        </q-toolbar-title>
      </q-toolbar>

      <div slot="left"
        v-if="currentUser"
      >
        <!--
          Use <q-side-link> component
          instead of <q-item> for
          internal vue-router navigation
        -->

        <q-list no-border link inset-delimiter>
          <q-list-header>Vue app</q-list-header>
          <q-item @click="logout">
            <q-item-side icon="exit_to_app" />
            <q-item-main label="Log out" sublabel="Close your actual session" />
          </q-item>
        </q-list>
      </div>

      <router-view />
    </q-layout>
  </div>

</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  Toast,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'
import { mapGetters, mapActions } from 'vuex'
export default {
  mounted () {
    if (this.$oauth.isAuthenticated()) {
      this.getCurrentUser()
    }
  },
  methods: {
    logout () {
      let timeout = 500
      Toast.create({
        html: 'Logging out',
        icon: 'alarm_add',
        timeout,
        color: '#fff',
        bgColor: '#444'
      })

      // Logout
      this.$refs.layout.toggleLeft()
      this.$oauth.logout()
      this.destroyCurrentUser()
      // Redirect to Login
      this.$router.replace('/login')
    },
    ...mapActions('users', ['getCurrentUser', 'destroyCurrentUser'])
  },
  computed: {
    ...mapGetters('users', ['currentUser'])
  },
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    Toast,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  }
}
</script>

<style></style>
