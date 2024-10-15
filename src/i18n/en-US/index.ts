export default {
  userTable: {
    title: 'User list',
    noData: 'No users',
    noResults: 'No results found',
    columns: {
      avatar: '',
      name: 'Full Name',
      action: 'Action',
    },
    search: 'Search for users...',
    add: 'Add User',
    actions: {
      edit: 'Edit',
    },
    dialog: {
      message: 'Are you sure you want to delete this user?',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
    api: {
      updateUser: {
        success: 'User updated!',
      },
    },
  },
  userForm: {
    add: {
      title: 'Add user',
    },
    edit: {
      title: 'Edit user',
    },
    submit: 'Update Details',
    photo: 'Change Photo',
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      validateError: 'Name cannot be empty!',
    },
    dialog: {
      label: 'Photo URL',
      input: 'Paste the link (URL) to the photo here',
      cancel: 'Cancel',
      save: 'Save',
      error: 'The link does not contain a picture!',
    },
  },
};
