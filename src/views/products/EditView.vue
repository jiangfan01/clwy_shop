<template>
  <div>
    <ProductFrom :isEdit="true" />
  </div>
</template>
<script>
import ProductFrom from "@/views/products/components/ProductFrom";

export default {
  components: { ProductFrom },
};
</script>
