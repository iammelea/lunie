<template>
  <div class="copyable-address">
    <div
      v-tooltip.top="`Click to copy`"
      v-clipboard:copy="address"
      v-clipboard:success="() => onCopy()"
      class="address"
    >
      {{ address | formatAddress }}
      <i class="material-icons notranslate copy">content_copy</i>
    </div>
    <div :class="{ active: copySuccess }" class="icon-container">
      <i class="material-icons notranslate success">check</i>
    </div>
  </div>
</template>

<script>
import { formatAddress } from "src/filters"

export default {
  name: `lunie-address`,
  filters: {
    formatAddress
  },
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data: () => ({
    copySuccess: false
  }),
  methods: {
    onCopy() {
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 2500)
    }
  }
}
</script>
<style>
.copyable-address {
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  font-size: inherit;
  color: var(--link);
}

.copyable-address .address {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.copyable-address .address:hover {
  color: var(--link-hover);
}

.copyable-address .icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.copyable-address .icon-container .success {
  opacity: 0;
  transition: opacity 250ms ease;
}

.copyable-address .icon-container.active .success {
  opacity: 1;
}

.copyable-address i {
  font-size: 12px;
  padding-left: 0.25rem;
}

.copyable-address .icon-container i.success {
  color: var(--success);
}
.copyable-address .icon-container i.success {
  color: var(--success);
}
</style>
