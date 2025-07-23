<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action">
        <i class="pi pi-bars"></i>
      </button>
      <RouterLink to="/" class="layout-topbar-logo">
        <svg width="140" viewBox="0 0 370 85.95988162852808" class="looka-1j8o68f"><defs id="SvgjsDefs1011"></defs><g id="SvgjsG1012" featurekey="PG4fjM-0" transform="matrix(2.865329387617603,0,0,2.865329387617603,-7.449856134546663,-14.326646938088015)" fill="#005792"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M16.6,16.4c-3,1.2-6.5,2.6-9.2,8.3l8.6,4.8c2-4.7,4.6-5.7,7.6-6.9  c3-1.2,6.3-2.5,8.9-7.5l-8.5-5C21.8,14.3,19.4,15.3,16.6,16.4z M23.3,19.5c0,1.4-1.6,2.5-3.5,2.5c-1.9,0-3.5-1.1-3.5-2.5  c0-1.4,1.6-2.5,3.5-2.5C21.7,17,23.3,18.1,23.3,19.5z M22.2,5l-1.7,3.3c-1.8,3.5-3.7,4.2-6.3,5.3c-3.2,1.3-7.2,2.9-10.2,9.3  l-1.4,2.9L18,35l1.6-3.7c1.7-3.9,3.6-4.7,6.5-5.8c3.1-1.2,7-2.8,9.9-8.4l1.5-2.9L22.2,5z M34.2,16.2c-2.5,4.9-5.9,6.3-8.9,7.5  c-3,1.2-5.6,2.2-7.6,6.9l-0.7,1.6L5.1,25l0.6-1.2c2.7-5.7,6.2-7.1,9.2-8.3c2.8-1.1,5.1-2.1,7.3-6.2L23,7.8l11.9,7.1L34.2,16.2z"></path></g><g id="SvgjsG1013" featurekey="jxYttZ-0" transform="matrix(3.1768742787488073,0,0,3.1768742787488073,114.28162644973732,3.687465431084135)" fill="#005792"><path d="M12.92 10.52 c0 3.04 -2.36 5.5 -5.28 5.52 l-3.6 0 l0 3.96 l-2.24 0 l0 -15 l5.84 0 c2.92 0.02 5.28 2.48 5.28 5.52 z M7.6 14.2 c1.72 0 3.1 -1.66 3.1 -3.68 s-1.38 -3.68 -3.1 -3.68 l-3.56 0 l0 7.36 l3.56 0 z M22.340000000000003 6.66 c-3.16 0 -5.4 2.8 -5.4 5.84 c0 3.06 2.24 5.86 5.4 5.86 c3.18 0 5.4 -2.8 5.4 -5.86 c0 -3.04 -2.24 -5.84 -5.4 -5.84 z M22.340000000000003 4.82 c4.2 0 7.62 3.32 7.62 7.68 s-3.42 7.7 -7.62 7.7 s-7.62 -3.34 -7.62 -7.7 s3.42 -7.68 7.62 -7.68 z M39.68 13.98 l0 1.68 l-7.12 0 l0 -1.68 l7.12 0 z M45.5 5 l0 15 l-2.22 0 l0 -15 l2.22 0 z M66.24000000000001 5 l0.32 0 l0 15 l-2.22 0 l0 -11.26 l-5.78 11.26 l-1.26 0 l-5.78 -11.26 l0 11.26 l-2.22 0 l0 -15 l0.3 0 l2.38 0 l5.94 11.6 l5.94 -11.6 l2.38 0 z M80.26 14.5 c0.06 0.14 0.54 1.5 -0.08 2.92 c-0.72 1.7 -2.74 2.76 -5.26 2.78 c-2.18 0 -4.16 -0.96 -5.56 -2.48 l1.48 -1.48 c0.7 1.24 2.48 2.12 4.08 2.12 c1.74 -0.02 2.76 -0.66 3.18 -1.66 c0.32 -0.74 0.06 -1.54 0.04 -1.56 c-0.42 -1.16 -1.58 -1.42 -3.22 -1.92 c-1.86 -0.56 -4 -1.02 -4.7 -2.98 c-0.38 -1.02 -0.28 -2.2 0.24 -3.16 c1.16 -2.2 4.12 -2.26 4.46 -2.26 c2.2 0 4.16 0.96 5.56 2.5 l-1.46 1.46 c-0.82 -1.2 -2.42 -2.12 -4.1 -2.12 c-0.02 0 -1.78 0 -2.46 1.28 c-0.26 0.5 -0.32 1.16 -0.14 1.68 c0.4 1.1 1.54 1.36 3.14 1.84 c1.9 0.58 4.04 1.02 4.8 3.04 z"></path></g></svg> 
      </RouterLink>
    </div>

    <div class="layout-topbar-menu">
      <button type="button" class="layout-topbar-action">
        <i class="pi pi-inbox"></i>
      </button>
      <button type="button" class="layout-topbar-action">
        <i class="pi pi-user"></i>
      </button>
    </div>
    
  </div>

  <nav>
    <div>
      <h1>Purchase Order IMS</h1>
      <div>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'posales' }">PO Sales</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'installments' }">Installments</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>