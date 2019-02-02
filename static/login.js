const cookieName = 'x-admin-token'
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const qs = parseQuery(location.search)
// console.log(qs)

const app = new Vue({
  el: '#app',

  data: {
    loading: 'Loading...',
    user: undefined,
  },

  methods: {
    login: async function() {
      try {
        await firebase.auth().signInWithRedirect(googleAuthProvider)
      } catch (err) {
        logError(err)
      }
    },

    logout: async function() {
      try {
        Cookies.remove(cookieName)
        await firebase.auth().signOut()

        if (qs.logout && qs.return) {
          alert('Logged out, redurecting back...')
          location.href = qs.return
        }
      } catch (err) {
        logError(err)
      }
    },
  },
})

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC_ooKU2uYbczwRQVfAa6VjGbxfkV-9cYI",
  authDomain: "test124-1621f.firebaseapp.com",
}
firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  // console.log('onAuthStateChanged, user: ', JSON.stringify(user, null, 2))
  console.log('onAuthStateChanged, user: ', user)
  onUser(user)
})

// console.log('cookies all', Cookies.get())
// alert('qs:\n' + JSON.stringify(qs, null, 2))

if (qs.logout) app.logout()

////

async function onUser(user) {
  try {
    // alert('onUser')
    app.user = user
    app.loading = false
    if (!user) {
      if (qs.autoLogin) app.login()
    } else {
      const token = await firebase.auth().currentUser.getIdToken(true)
      // alert('idToken')
      // console.log(idToken)
      app.user = Object.assign({}, app.user, {
        token,
      })
      Cookies.set(cookieName, token, {
        // secure: true,
      })

      // Redirect if needed
      if (qs.return) {
        // alert(`Logged in as ${app.user.email}, redirecting back...`)
        location.href = qs.return
      }
    }
  } catch (err) {
    logError(err)
  }
}

function parseQuery(queryString) {
  const query = {}
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

function logError(err) {
  console.error(err)
  alert('Error\n ' + JSON.stringify(err, null, 2))
}
