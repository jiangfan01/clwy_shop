<template>
  <div>
    <ShopForm :isEdit="false" />
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
