<template lang="pug">
  .person-item
    .row
      q-field.col
        q-input(type="text" :disable="disabled" v-model="model.first_name")
      q-field.col
        q-input(type="text" :disable="disabled" v-model="model.last_name")
    q-btn(:class="{ 'bg-green' : disabled , 'bg-blue' : !disabled }" @click="editItem") {{ disabled? 'Edit' : 'Finish'}}
    q-btn.bg-red( @click="deleteItem" ) Delete
    q-btn.bg-grey( @click="cancel"  v-if="disabled == false") Cancel
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'
import { Person } from 'database/Person.model'
export default {
  props: {
    model: {
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      disabled: true,
      originalData: undefined
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.originalData = this.model
    })
  },
  methods: {
    async updateItem () {
      try {
        await Person.update(this.model.id, this.model)
        this.$emit('removed', this.model)
      }
      catch (error) {
        throw error
      }
    },
    async deleteItem () {
      try {
        await Person.remove(this.model.id)
        this.$emit('delete', this.model)
      }
      catch (error) {
        console.log(error)
        throw error
      }
    },
    editItem () {
      if (!this.disabled) {
        this.updateItem()
      }
      this.disabled = !this.disabled
    },
    cancel () {
      this.model = this.originalData
      this.disabled = true
    }
  },
  components: { QField, QInput, QBtn }
}
</script>

<style lang="scss">
.person-item{
  max-width: 420px;
  margin: 10px;
  padding: 15px;
  box-shadow: 1px 4px 11px 1px rgba(0, 0, 0, 0.2);
  .q-btn {
    margin: 10px;
  }
  .col{
    padding: 5px;
  }
}
</style>
