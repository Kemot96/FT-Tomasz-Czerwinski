<template>
  <q-page class="row items-start q-pa-md q-mt-4">
    <div class="q-pa-md page" style="width: 100%">
      <UserForm mode="edit" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import UserForm from 'src/components/UserForm.vue';
defineOptions({
  name: 'UserEditPage',
});
</script>
