<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
    <div class="container-fluid">
      <h1 class="navbar-brand m-0">Purchase Order IMS</h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" aria-current="page">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'posales' }" class="nav-link" aria-current="page">PO Sales</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'installments' }" class="nav-link" aria-current="page">Installments</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>