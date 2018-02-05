<template>
  <div class="hello-view layout-padding">
    <h5>Current User</h5>
    <pre v-text="user" class="bg-black text-white"></pre>
    <q-btn type="button" @click="getUser" primary> Get user </q-btn>
    <p> {{ status }}</p>
  </div>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

import User from 'src/services/User.service'
import Visit from 'src/services/VisitService'

export default {
  name: 'index',
  data () {
    return {
      user: null
    }
  },
  computed: {
    status () {
      return this.$store.state.app.status
    }
  },
  methods: {
    async getUser () {
      let response = await User.currentUser()
      this.user = response.data
      this.$event.fire('user:updated', response)
    },
    async mounted () {
      await Visit.get()
    }
  },
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  }
}
</script>

<style lang='scss'>
  .hello-view{
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
</style>
