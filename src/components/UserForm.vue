<template>
  <h3 class="title">{{ getTitle() }}</h3>
  <div class="cards">
    <q-card class="card-form">
      <q-card-section class="q-pa-md">
        <div class="input-row">
          <div class="input-group">
            <label>{{ $t('userForm.form.firstName') }}</label>
            <q-input
              v-model="firstName"
              outlined
              dense
              :error="!isValidFirstName"
            />
          </div>
          <div class="input-group">
            <label>{{ $t('userForm.form.lastName') }}</label>
            <q-input
              v-model="lastName"
              outlined
              dense
              :error="!isValidLastName"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-md q-gutter-md">
        <div class="action-container">
          <q-btn
            :label="$t('userForm.submit')"
            color="primary"
            @click="save"
            no-caps
          />
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="card-photo">
      <div class="image-container">
        <q-img
          width="150px"
          height="150px"
          :src="photoUrl"
          fit="cover"
          img-class="avatar"
          style="margin-top: 2px; margin-bottom: 2px"
        />
      </div>
      <q-btn no-caps class="change-photo-btn q-mt-xs" @click="openDialog">
        <q-icon name="camera_alt" size="md" />
        <span class="q-ml-sm">{{ $t('userForm.photo') }}</span>
      </q-btn>
    </q-card>
  </div>

  <DialogInputLink
    :open="isDialogOpen"
    @cancel="closeDialog"
    @confirm="changePhoto"
    :url="photoUrl"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import DialogInputLink from 'src/components/DialogInputLink.vue';
import { isValidImageUrl } from 'src/utils/users';
import { showError } from 'src/utils/notifications';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { IUserRequest } from 'src/types';

interface Props {
  mode: 'add' | 'edit';
}

const props = defineProps<Props>();

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const defaultURL = 'http://localhost:9000/images/default-avatar.jpg';

const firstName = ref('');
const isValidFirstName = ref(true);
const lastName = ref('');
const isValidLastName = ref(true);
const photoUrl = ref(defaultURL);
const isDialogOpen = ref(false);

function getTitle() {
  return props.mode === 'add'
    ? t('userForm.add.title')
    : t('userForm.edit.title');
}

function openDialog() {
  isDialogOpen.value = true;
}

function closeDialog() {
  isDialogOpen.value = false;
}

function validateInput() {
  isValidFirstName.value = firstName.value.trim().length !== 0;
  isValidLastName.value = lastName.value.trim().length !== 0;
  if (!isValidFirstName.value || !isValidLastName.value) {
    showError(t('userForm.form.validateError'));
    return false;
  }
  return true;
}

async function save() {
  const isValid = validateInput();
  if (isValid) {
    switch (props.mode) {
      case 'add':
        const userDataToAdd = {
          first_name: firstName.value,
          last_name: lastName.value,
          avatar: photoUrl.value,
        };
        await addUser(userDataToAdd);
        break;

      case 'edit':
        const id = Number(route.params.id);
        const userDataToEdit = {
          first_name: firstName.value,
          last_name: lastName.value,
          avatar: photoUrl.value,
          id: id,
        };
        await updateUser(userDataToEdit);
        break;

      default:
        console.error('Wrong mode!');
    }
  }
}

async function addUser(userData: IUserRequest) {
  try {
    await userStore.addUser(userData);
    router.push({ path: '/' });
  } catch (error) {
    console.error(error);
  }
}

async function updateUser(userData: IUserRequest) {
  try {
    await userStore.updateUser(userData);
    router.push({ path: '/' });
  } catch (error) {
    console.error(error);
  }
}

function changePhoto(url: string) {
  const isValid = isValidImageUrl(url);
  if (isValid) {
    photoUrl.value = url;
  } else {
    photoUrl.value = defaultURL;
    showError(t('userForm.dialog.error'));
  }

  closeDialog();
}

async function fetchUser() {
  const id = Number(route.params.id);
  try {
    const user = await userStore.fetchUser(id, false);
    if (user) {
      firstName.value = user.first_name;
      lastName.value = user.last_name;
      photoUrl.value = user.avatar;
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  if (props.mode === 'edit') {
    await fetchUser();
  }
});
</script>
