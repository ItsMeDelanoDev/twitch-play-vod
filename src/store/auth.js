import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    clientId: import.meta.env.VITE_TWITCH_CLIENT_ID,
    accessToken: '',
  }),
  getters: {
    getToken: (state) => {
      return { ...state }
    },
  },
  actions: {
    /**
     * @param accessToken
     * @returns {string}
     */
    setToken(accessToken) {
      return this.accessToken = accessToken
    },
  },
  persist: true
})
