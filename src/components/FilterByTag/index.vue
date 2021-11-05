<template>
  <div class="tag-filter">
    <p class="tag-filter__title">{{ $t("message.FiltersText.Title") }}</p>
    <span class="tag-filter__input">
      <CustomColorSelect
        :options="filterOptions"
        :currentValue="currentTag"
        :disabled="disabled"
        @setColor="setColor"
      />
    </span>
  </div>
</template>

<script>
import CustomColorSelect from "@/components/Inputs/CustomColorSelect.vue";
import { mapGetters } from "vuex";

export default {
  name: "FilterByTag",
  props: {
    allItems: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
  },
  components: {
    CustomColorSelect,
  },
  data() {
    return {
      currentTag: {
        label: this.$t("message.FiltersText.AllTags"),
        value: "all-color",
        text: "",
      },
    };
  },

  mounted() {
    console.log("disabled: ", this.disabled);
  },

  watch: {
    allItems() {
      this.setColor(this.currentTag);
    },
  },

  computed: {
    ...mapGetters(["getTags", "getCurrentTagByValue", "getTodoItems"]),
    filterOptions() {
      const currentTags = [...this.getTags];
      currentTags.unshift({
        label: this.$t("message.FiltersText.AllTags"),
        value: "all-color",
        text: "",
      });
      return currentTags;
    },
  },
  methods: {
    setColor(color) {
      this.currentTag = color;
      let filteringItems;
      if (this.currentTag.value === "all-color") {
        filteringItems = this.allItems;
      } else {
        filteringItems = this.allItems.filter(
          (item) => item.tag.value === this.currentTag.value
        );
      }

      this.$emit("handleFilter", filteringItems);
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-filter {
  display: flex;
  align-items: center;

  &__input {
    min-width: 250px;
    margin-left: 12px;
  }
}
</style>
