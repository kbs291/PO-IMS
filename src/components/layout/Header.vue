<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
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