<template>
  <div class="tx__icon">
    <img :src="icon" :alt="transactionType" />
  </div>
</template>

<script>
export default {
  name: `transaction-icon`,
  props: {
    transactionType: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return `/img/icons/activity/${this.transactionType}.svg`
    }
  }
}
</script>

<style>
.tx__icon {
  padding: 1rem;
}

.tx__icon img {
  max-height: 100%;
  max-width: 40px;
  display: block;
}

@media screen and (min-width: 1023px) {
  .tx__icon img {
    max-width: 48px;
  }
}
</style>
