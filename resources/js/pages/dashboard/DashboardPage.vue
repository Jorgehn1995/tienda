<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12">

      </v-col>
    </v-row>
  </div>
</template>

<script>
// DEMO Cards for dashboard
import SalesCard from '../../components/dashboard/SalesCard'

export default {
  components: {
    SalesCard
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>
