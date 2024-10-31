<template>
  <div id="app-amount">
    <div class="container-template">
      <div class="wallet-card">
        <div class="balance">
          <div class="left">
            <span class="title">
              <slot name="title-left" />
            </span>
            <h1 class="total">
              <slot name="amount-left" />
            </h1>
            <h2 class="total">
              <slot name="amount-remaining-left" />
            </h2>
          </div>
          <div class="right">
            <!-- <q-btn color="primary" icon="fa-solid fa-circle-plus" flat size="20px" /> -->
            <slot name="button-right" />

          </div>
        </div>
        <div class="wallet-footer">
          <slot name="footer" />

          <!-- <div class="item">
            <q-btn color="primary" icon="tune" flat />
          </div>
          <div class="item">
            <q-btn color="primary" icon="fa-solid fa-chart-pie" flat />
          </div>
          <div class="item">
            <q-btn color="primary" icon="fa-solid fa-file-pdf" flat />
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app-amount {
  @import 'src/assets/app-amount.scss';
}
</style>
