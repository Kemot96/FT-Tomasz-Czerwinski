<template>
  <h3 class="title">{{ $t('userTable.title') }}</h3>
  <q-card class="card-table">
    <q-table
      :rows="userStore.users"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      :no-data-label="$t('userTable.noData')"
      :no-results-label="$t('userTable.noResults')"
      dense
      hide-pagination
      v-model:pagination="pagination"
      separator="none"
      table-header-class="text-subtitle1"
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          :class="props.rowIndex % 2 === 0 ? 'layout' : undefined"
        >
          {{ props.value }}
        </q-td>
      </template>

      <template v-slot:top>
        <div class="table-top-container">
          <q-input
            v-model="searchId"
            :label="$t('userTable.search')"
            filled
            class="search-input"
            @keyup.enter="fetchUser"
            dense
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            @click="gotoAddUser"
            rounded
            class="add-user-btn"
            no-caps
          >
            <q-icon left size="1.5em" name="add" />
            <div class="add-user-btn-text">{{ $t('userTable.add') }}</div>
          </q-btn>
        </div>
      </template>

      <template v-slot:body-cell-avatar="props">
        <q-td
          :props="props"
          :class="props.rowIndex % 2 === 0 ? 'layout' : undefined"
          style="width: 100px"
        >
          <q-img
            width="40px"
            height="40px"
            :src="props.row.avatar"
            fit="cover"
            img-class="avatar"
            style="margin-top: 2px; margin-bottom: 2px"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td
          :props="props"
          :class="props.rowIndex % 2 === 0 ? 'layout' : undefined"
          style="width: 100px"
        >
          <q-icon
            name="edit"
            @click="handleEdit(props.row.id)"
            class="action-icon"
          />
          <q-icon
            name="delete"
            @click="openConfirmDialog(props.row.id)"
            class="action-icon"
          />
        </q-td>
      </template>
    </q-table>
  </q-card>

  <div class="pagination">
    <q-pagination
      v-model="pagination.page"
      @update:model-value="fetchUsers"
      :max="pagination.totalPages"
      color="primary"
      boundary-links
    />
  </div>
  <DialogConfirmDelete
    :open="openDialog"
    @cancel="closeConfirmDialog"
    @confirm="handleConfirmDelete"
  />
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { computed, ref, onMounted, Ref } from 'vue';
import { QTableColumn } from 'quasar';
import { IPagination } from 'src/types';
import { useRouter } from 'vue-router';
import DialogConfirmDelete from './DialogConfirmDelete.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const userStore = useUserStore();

const columns: QTableColumn[] = [
  {
    name: 'avatar',
    label: t('userTable.columns.avatar'),
    field: 'avatar',
    align: 'left',
  },
  {
    name: 'name',
    label: t('userTable.columns.name'),
    field: 'full_name',
    align: 'left',
  },
  {
    name: 'action',
    label: t('userTable.columns.action'),
    field: '',
    align: 'left',
  },
];

const pagination: Ref<IPagination> = ref({
  page: 1,
  rowsPerPage: 10,
  totalPages: 1,
});
const isLoading = computed(() => userStore.isLoading);
const searchId = ref();
const openDialog = ref(false);
const deletedUserId: Ref<number | null> = ref(null);

async function fetchUsers() {
  try {
    const response = await userStore.fetchUsers(pagination.value);
    if (response) {
      pagination.value = {
        page: response.page,
        rowsPerPage: response.per_page,
        rowsNumber: response.total,
        totalPages: response.total_pages,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchUser() {
  try {
    const id = searchId.value.trim();
    if (id) {
      await userStore.fetchUser(id);
    } else {
      await fetchUsers();
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleEdit(id: number) {
  router.push({ path: `/edit/${id}` });
}

function openConfirmDialog(id: number) {
  deletedUserId.value = id;
  openDialog.value = true;
}

function closeConfirmDialog() {
  openDialog.value = false;
  deletedUserId.value = null;
}

async function handleConfirmDelete() {
  try {
    if (deletedUserId.value) {
      await userStore.deleteUser(deletedUserId.value);
    } else {
      throw Error;
    }
  } catch (error) {
    console.error(error);
  } finally {
    closeConfirmDialog();
  }
}

function gotoAddUser() {
  router.push({ path: '/add' });
}

onMounted(async () => await fetchUsers());
</script>
