<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          {{ $t('userTable.dialog.message') }}
        </span>
      </q-card-section>

      <q-card-actions class="q-pa-md q-gutter-md">
        <div class="q-ml-auto">
          <q-btn
            :label="$t('userTable.dialog.cancel')"
            color="negative"
            @click="cancel"
            class="q-mr-md"
          />
          <q-btn
            :label="$t('userTable.dialog.confirm')"
            color="primary"
            @click="confirm"
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
}

const props = defineProps<Props>();
const emit = defineEmits(['cancel', 'confirm']);

const isOpen = ref(false);

watch(
  () => props.open,
  (open) => {
    isOpen.value = open;
  }
);

function cancel() {
  emit('cancel');
}

function confirm() {
  emit('confirm');
}
</script>
