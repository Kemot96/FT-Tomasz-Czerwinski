<template>
  <q-page class="row items-start q-pa-md q-mt-4">
    <div class="q-pa-md page" style="overflow-x: auto; width: 100%">
      <UserTable />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import UserTable from 'src/components/UserTable.vue';
defineOptions({
  name: 'UsersPage',
});
</script>
