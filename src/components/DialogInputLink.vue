<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="dialog-input-link">
      <q-card-section class="q-pa-md">
        <div class="input-group">
          <label>{{ $t('userForm.dialog.label') }}</label>
          <q-input
            v-model="photoUrl"
            outlined
            dense
            :label="$t('userForm.dialog.input')"
          />
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-md q-gutter-md">
        <div class="q-ml-auto">
          <q-btn
            :label="$t('userForm.dialog.cancel')"
            color="negative"
            @click="close"
            class="q-mr-md"
          />
          <q-btn
            :label="$t('userForm.dialog.save')"
            color="primary"
            @click="save"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  url: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['cancel', 'confirm']);

const isOpen = ref(false);
const photoUrl = ref('');

watch(
  () => props.open,
  (open) => {
    isOpen.value = open;
  }
);

watch(
  () => props.url,
  (url) => {
    photoUrl.value = url;
  }
);

function close() {
  emit('cancel');
}

function save() {
  emit('confirm', photoUrl.value);
}
</script>
