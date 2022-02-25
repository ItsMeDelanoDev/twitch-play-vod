import {useAuthStore} from "../store/auth.js";
import {computed} from "vue";
import {useUserStore} from "../store/user.js";

export default () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const accessToken = computed(() => authStore.accessToken)

  /**
   * @returns {Promise<void>}
   */
  const login = async () => {
    if (accessToken.value) {
      userStore.$state = await getTwitchUserByUsername()
      return
    }

    const queryParams = window.location.hash.substring(1) // Removing the initial #
    let params = new URLSearchParams(queryParams);

    const paramAccessToken = params.get('access_token')
    if (paramAccessToken) {
      await authStore.setToken(paramAccessToken)
      userStore.$state = await getTwitchUserByUsername()
      window.location.hash = ''
    }
  }

  /**
   * @param {string|array} username
   * @returns {Promise<void>|undefined}
   */
  const getTwitchUserByUsername = async (username = '') => {
    const isMultipleUsers = Array.isArray(username)
    let getUserUrl = 'https://api.twitch.tv/helix/users'
    if (username) {
      getUserUrl += '?'
      const usernames = isMultipleUsers ? [...username] : [username]
      usernames.forEach(username => {
        getUserUrl += `login=${username}&`
      })
    }

    return await fetch(getUserUrl, {headers: headers.value})
      .then(response => response.json())
      .then(response => isMultipleUsers ? response.data : response.data[0])
      .catch(console.error)
  }

  /**
   * @param {string} channel
   * @returns {Promise<any>}
   */
  const getVideosByChannel = async (channel) => {
    const user = await getTwitchUserByUsername(channel)
    let getUserUrl = `https://api.twitch.tv/helix/videos?user_id=${user.id}&first=100`
    return await fetch(getUserUrl, {headers: headers.value})
      .then(response => response.json())
      .then(response => response.data)
      .catch(console.error)
  }

  const headers = computed(() => {
    return {
      'Client-Id': authStore.clientId,
      'Authorization': 'Bearer ' + authStore.accessToken
    }
  })

  const authUrl = computed(() => {
    const redirectURL = import.meta.env.VITE_TWITCH_REDIRECT_URL
    return `https://id.twitch.tv/oauth2/authorize?client_id=${authStore.clientId}&redirect_uri=${redirectURL}&response_type=token`
  })

  /**
   * Sign out user by clearing state
   */
  const signOut = () => {
    userStore.$reset()
    authStore.$reset()
  }

  return {
    isAuthenticated: accessToken,
    authUrl,
    login,
    getTwitchUserByUsername,
    getVideosByChannel,
    signOut,
  };
};
