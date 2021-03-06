import router from "vue-router"
import routes from "./routes"
import Vue from "vue"

/* istanbul ignore next */
Vue.use(router)

const networkCapabilityDictionary = {
  true: "ENABLED",
  false: "DISABLED",
  null: "MISSING"
}

export const routeGuard = (store, apollo) => async (to, from, next) => {
  // Set any open modal to false
  store.state.session.currrentModalOpen = false

  // Redirect if fullPath begins with a hash (fallback for old pre history mode urls)
  if (to.fullPath.includes("#")) {
    const path = to.fullPath.substr(to.fullPath.indexOf("#") + 1)
    next(path)
    return
  }

  if (
    to.meta.feature &&
    !(store.state.connection.network === "testnet") && // TODO remove once we have Hasura integrated in e2e tests
    !(await featureAvailable(
      apollo,
      store.state.connection.networks,
      store.state.connection.network,
      to
    ))
  ) {
    next(`/feature-not-available/${to.meta.feature}`)
    return
  }

  if (from.fullPath !== to.fullPath && !store.state.session.pauseHistory) {
    store.commit(`addHistory`, from.fullPath)
  }

  next()
}

/* istanbul ignore next */
const Router = (apollo, store) =>
  new router({
    mode: process.env.VUE_APP_E2E ? undefined : "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: routes(apollo, store)
  })

export default Router

// check if feature is allowed and redirect if not
async function featureAvailable(apollo, networks, networkId, to) {
  const feature = `feature_${to.meta.feature.toLowerCase()}`
  const network = networks.find(({ id }) => id === networkId)
  // DEPRECATE hack to ensure retro compatibility with old API (network capabilities as booleans)
  return typeof network[feature] === `boolean` || network[feature] === null
    ? networkCapabilityDictionary[network[feature]] === "ENABLED"
    : network[feature] === "ENABLED"
}
