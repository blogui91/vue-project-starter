<template lang="pug">
  div.hello-view.layout-padding
    form(@submit="createPerson")
      .row
        .col.col-xs-12.col-sm-6(style="padding:10px;")
          q-input(type="text" v-model="form.first_name" placeholder="First name" required)
        .col.col-xs-12.col-sm-6(style="padding:10px;")
          q-input(type="text" v-model="form.last_name" placeholder="Last name" required)
      .row.items-center
        .col.col-xs-12.col-sm-6(style="padding:10px;")
          q-input.col.col-xs-10(type="number" v-model="form.age" placeholder="Age")
        .col.col-xs-12.col-sm-6
          q-btn(type="submit" class="primary") Create person
    hr
    .row
      person-item(:model="person" :key="person.id" v-for="person in persons" @delete="getPersons")
    q-btn(@click="getPersons") Get persons
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
  QItemMain,
  QInput,
  QField
} from 'quasar'

import { Person } from 'src/database/Person.model'
import User from 'src/services/User.service'
import Visit from 'src/services/Visit.service'
import PersonItem from '@/person-item'
export default {
  name: 'index',
  data () {
    return {
      user: null,
      persons: undefined,
      newPerson: undefined,
      form: {
        first_name: '',
        last_name: '',
        age: null
      }
    }
  },
  computed: {
    status () {
      return this.$store.state.app.status
    }
  },
  created () {
    this.getPersons()
  },
  methods: {
    async getPersons () {
      const persons = await Person.getAll()
      this.persons = persons
    },
    resetForm () {
      this.form = {
        first_name: '',
        last_name: '',
        age: null
      }
    },
    async createPerson () {
      const newPerson = await Person.add(this.form)
      this.newPerson = newPerson
      this.getPersons()
      this.resetForm()
    },
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
    QItemMain,
    QInput,
    QField,
    PersonItem
  }
}
</script>

<style lang='scss'>
  .hello-view{
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
</style>
