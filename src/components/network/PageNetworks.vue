<template>
  <TmPage data-title="Network" class="page" hide-header>
    <template>
      <h3>Main Networks</h3>
      <NetworkList :networks="mainNetworks" />

      <h3>Test Networks</h3>
      <NetworkList :networks="testNetworks" />

      <h3>Coming Soon</h3>
      <NetworkList :networks="comingSoon" :disabled="true" />
    </template>
  </TmPage>
</template>

<script>
import { mapGetters } from "vuex"
import NetworkList from "./NetworkList"

import TmPage from "common/TmPage"
export default {
  name: `page-networks`,
  components: {
    TmPage,
    NetworkList
  },
  data: () => ({
    comingSoon: [
      {
        id: "polkadot-mainnet",
        title: "Polkadot",
        icon: "/img/networks/polkadot-mainnet.png"
      },
      {
        id: "polkadot-testnet",
        title: "Kusama",
        icon: "/img/networks/polkadot-testnet.png"
      },
      {
        id: "tezos-mainnet",
        title: "Tezos",
        icon: "/img/networks/tezos-mainnet.png"
      },
      {
        id: "dawnchain-testnet",
        title: "Dawn",
        icon: "/img/networks/dawnchain-testnet.png"
      },
      {
        id: "akash-testnet",
        title: "Akash",
        icon: "/img/networks/akash-testnet.png"
      }
    ]
  }),
  computed: {
    ...mapGetters([`networks`]),
    mainNetworks() {
      return this.networks.filter(network => !network.testnet)
    },
    testNetworks() {
      return this.networks.filter(network => network.testnet)
    }
  }
}
</script>
<style scoped>
.page {
  padding: 2rem;
  margin: 0 auto;
  max-width: 680px;
}

h3 {
  margin: 0 0 0.25rem 1rem;
  color: var(--dim);
  font-size: var(--sm);
  font-weight: 500;
}

@media screen and (max-width: 767px) {
  .page {
    padding: 1rem;
  }
}
</style>
