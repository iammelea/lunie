<template>
  <menu class="app-menu">
    <div v-if="session.signedIn" class="user-box">
      <div class="user-box-address">
        <div>
          <h3>Your Address</h3>
          <Address :address="address || ''" />
        </div>
        <a v-if="session.signedIn" id="sign-out" @click="signOut()">
          <i v-tooltip.top="'Sign Out'" class="material-icons notranslate">
            exit_to_app
          </i>
        </a>
      </div>
      <a
        v-if="!session.isMobile && session.sessionType === 'ledger'"
        class="show-on-ledger"
        @click="showAddressOnLedger()"
      >
        Show on Ledger
      </a>
      <TmFormMsg
        v-if="ledgerAddressError"
        :msg="ledgerAddressError"
        type="custom"
      />
    </div>
    <TmBtn
      v-else
      id="sign-in"
      class="session-link"
      value="Sign In / Sign Up"
      type="secondary"
      size="small"
      @click.native="signIn()"
    />
    <div class="app-menu-main">
      <router-link
        class="app-menu-item hide-xs"
        :to="{ name: 'portfolio', params: { networkId: networkSlug } }"
        exact="exact"
        title="Portfolio"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Portfolio
        </h2>
        <i class="material-icons notranslate">chevron_right</i>
      </router-link>
      <router-link
        class="app-menu-item hide-xs"
        :to="{ name: 'Validators', params: { networkId: networkSlug } }"
        title="Validators"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Validators
        </h2>
        <i class="material-icons notranslate">chevron_right</i>
      </router-link>

      <router-link
        class="app-menu-item hide-xs"
        :to="{ name: 'Proposals', params: { networkId: networkSlug } }"
        title="Proposals"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Proposals
        </h2>
        <i class="material-icons notranslate">chevron_right</i>
      </router-link>

      <router-link
        class="app-menu-item hide-xs"
        :to="{ name: 'transactions', params: { networkId: networkSlug } }"
        exact="exact"
        title="Transactions"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Activity
        </h2>
        <i class="material-icons notranslate">chevron_right</i>
      </router-link>

      <router-link
        class="app-menu-item hide-xs"
        to="/networks"
        exact="exact"
        title="Networks"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Networks
        </h2>
        <i class="material-icons notranslate hide-xs">chevron_right</i>
      </router-link>

      <router-link
        class="app-menu-item hide-m"
        to="/about"
        exact="exact"
        title="About"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          About
        </h2>
      </router-link>

      <router-link
        class="app-menu-item hide-m"
        to="/careers"
        exact="exact"
        title="Careers"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Careers
        </h2>
      </router-link>

      <router-link
        class="app-menu-item hide-m"
        to="/security"
        exact="exact"
        title="Security"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Security
        </h2>
      </router-link>

      <router-link
        class="app-menu-item hide-m"
        to="/terms"
        exact="exact"
        title="Terms"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Terms of Service
        </h2>
      </router-link>

      <router-link
        class="app-menu-item hide-m"
        to="/privacy"
        exact="exact"
        title="Privacy"
        @click.native="handleClick()"
      >
        <h2 class="app-menu-title">
          Privacy Policy
        </h2>
      </router-link>
    </div>
    <ConnectedNetwork @close-menu="handleClick" />
  </menu>
</template>

<script>
import Address from "common/Address"
import ConnectedNetwork from "common/TmConnectedNetwork"
import TmBtn from "common/TmBtn"
import TmFormMsg from "common/TmFormMsg"
import { mapGetters, mapState } from "vuex"
import { atoms, viewDenom, shortDecimals } from "scripts/num.js"
import { showAddressOnLedger } from "scripts/ledger"
export default {
  name: `app-menu`,
  components: {
    Address,
    ConnectedNetwork,
    TmBtn,
    TmFormMsg
  },
  filters: {
    atoms,
    viewDenom,
    shortDecimals
  },
  data: () => ({
    ledgerAddressError: undefined,
    showAddressOnLedgerFn: showAddressOnLedger
  }),
  computed: {
    ...mapState([`session`, "connection"]),
    ...mapGetters([`address`, `network`]),
    networkSlug() {
      return this.connection.networkSlug
    }
  },
  methods: {
    handleClick() {
      this.$emit(`close`)
      window.scrollTo(0, 0)
    },
    signOut() {
      this.$emit(`close`)
      this.$store.dispatch(`signOut`, this.network)
    },
    signIn() {
      this.$router.push(`/welcome`)
      this.$emit(`close`)
    },
    async showAddressOnLedger() {
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout)
        this.messageTimeout = undefined
      }
      this.ledgerAddressError = undefined
      try {
        await this.showAddressOnLedgerFn(this.network, this.$store)
      } catch (error) {
        this.ledgerAddressError = error.message
        this.messageTimeout = setTimeout(
          () => (this.ledgerAddressError = undefined),
          8000
        )
      }
    }
  }
}
</script>

<style scoped>
.app-menu {
  z-index: var(--z-appMenu);
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
}

.app-menu .app-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  margin: 0.5rem 1rem;
  font-weight: 400;
  font-size: 14px;
  color: var(--text);
  border-radius: 0.25rem;
  transition: all 0.5s ease;
}

.app-menu-item:hover {
  background: var(--hover-bg);
}

.session-link {
  margin: 2.5rem 1rem 1rem;
}

.show-on-ledger {
  display: inline-block;
  padding-top: 1rem;
}

.show-on-ledger:hover {
  cursor: pointer;
}

.user-box {
  font-size: 12px;
  margin: 1rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--bc);
  border-radius: 0.25rem;
  display: block;
}

.user-box-address {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-box i {
  color: var(--dim);
  font-size: var(--m);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background: var(--bc-dim);
}

.user-box i:hover {
  background: var(--bc);
  cursor: pointer;
}

.app-menu .app-menu-item--link:hover {
  color: var(--link);
}

.app-menu .app-menu-item.router-link-active {
  background: var(--app-fg);
}

.app-menu .app-menu-item.router-link-active i {
  color: var(--tertiary);
}

.app-menu .app-menu-item.router-link-active h2 {
  color: var(--bright);
  font-weight: 500;
}

@media screen and (max-width: 1023px) {
  .app-menu {
    background: var(--app-nav);
    height: 100vh;
    top: 0;
    width: 100%;
  }

  .app-menu .app-menu-item {
    padding: 0.5rem;
  }

  .app-menu-title {
    font-size: var(--xxl);
    line-height: 1.125;
    font-weight: 600;
    letter-spacing: 0.004em;
    color: var(--bright);
  }
}

@media screen and (min-width: 1023px) {
  .app-menu {
    width: var(--width-side);
  }
}
</style>
