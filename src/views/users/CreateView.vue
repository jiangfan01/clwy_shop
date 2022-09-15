<template>
  <div>
    <usersForm :isEdit="false"></usersForm>
  </div>
</template>

<script>
import usersForm from "@/views/users/components/UsersForm";
export default {
  components: {
    usersForm,
  },
};
</script>
