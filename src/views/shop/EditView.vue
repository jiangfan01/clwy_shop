<template>
  <div>
    <ShopForm :isEdit="true" />
  </div>
</template>
<script>
import ShopForm from "@/views/shop/components/ShopForm";
export default {
  components: {
    ShopForm,
  },
};
</script>
