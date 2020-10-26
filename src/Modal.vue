<template>
  <transition :name="wrapperTransition">
    <div
      class="modal-wrapper"
      v-show="showModal"
      @click.self="onWrapperClicked"
    >
      <slot></slot>
      <div class="loading" v-if="showModal && loading">
        <slot name="loading"></slot>
      </div>
      <transition :name="innerTransition">
        <div :class="['modal-inner', modalClass]" v-show="showModal && !loading">
          <component :is="firstup ? adjustString($modal.name) : $modal.name" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    loading: {
      type: Boolean,
      default: true,
      description: 'whether use loading statement',
    },
    firstup: {
      type: Boolean,
      default: true,
      description: 'Whether modal components should use uppercase for first letter',
    },
    modalClass: {
      type: Object,
      default: () => ({}),
      description: 'Customize modal-inner classname for UI purpose',
    },
    wrapperTransition: {
      type: String,
      default: 'fade',
    },
    innerTransition: {
      type: String,
      default: '',
    },
  },
  computed: {
    showModal() {
      return !!this.$modal.name;
    },
  },
  methods: {
    onWrapperClicked() {
      return this.$emit('close');
    },
    adjustString(str) {
      return str && str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style lang="scss">
@mixin fullcover() {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@mixin alignCenter() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

$modal-width: 5rem;

.modal-wrapper {
  @include fullcover;
  position: fixed;
  background: rgba(0, 0, 0, 0.75);
  z-index: 997;
  animation-duration: 0.3s;
  > .loading {
    color: #fff;
    @include alignCenter;
  }
  > .modal-inner {
    @include alignCenter;
    font-size: 0.14rem;
    font-weight: 500;
    color: #fff;
    width: $modal-width;
    z-index: 998;
    animation-duration: 0.3s;
  }
}
</style>
