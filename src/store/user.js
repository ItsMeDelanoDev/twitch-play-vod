import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: "",
    login: "",
    display_name: "",
    type: "",
    broadcaster_type: "",
    description: "",
    profile_image_url: "",
    offline_image_url: "",
    view_count: "",
    created_at: "",
  }),
  getters: {
    getUser(state) {
      return {...state}
    },
  },
  actions: {
    setUser(user) {
      useUserStore.$state = user
    },
  },
})
