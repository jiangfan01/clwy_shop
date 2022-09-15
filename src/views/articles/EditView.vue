<template>
  <div>
    <ArticlesFrom :isEdit="true"></ArticlesFrom>
  </div>
</template>
<script>
import ArticlesFrom from "@/views/articles/components/ArticlesFrom";
export default {
  components: {
    ArticlesFrom,
  },
};
</script>
