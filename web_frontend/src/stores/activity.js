import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: []
  }),

  actions: {
    addActivity(activity) {
      this.activities.unshift({
        id: Date.now(),
        ...activity
      })
    }
  }
})
