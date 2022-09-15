<template>
  <div>
    <ArticlesFrom :isEdit="false"></ArticlesFrom>
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
