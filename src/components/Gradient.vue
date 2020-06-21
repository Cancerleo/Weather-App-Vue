<template>
  <div id="gradient"></div>
</template>
<script>
export default {
  methods: {
    update(temp) {
      let maxRange = -400;

      let coefficient = (temp + 40) / 80;
      coefficient = Math.max(0, Math.min(1, coefficient));
      console.log(
        `We should offset the gradient by ${maxRange * (1 - coefficient)}`
      );
      var gradient = document.getElementById("gradient");
      gradient.style.top = `${maxRange * (1 - coefficient)}%`;
      console.log(gradient.style.top);
    },
  },
};
</script>
