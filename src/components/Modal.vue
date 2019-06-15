<template>
  <div class="modal">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="modalVisible" class="backdrop"></div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
    
      <div v-if="modalVisible" class="modal-content" @click.self="hideModal">
        <div class="modal-body">
          <div class="modal-header">
            <h2 class="modal-title">{{title}}</h2>
            <i class="fa fa-times" @click='hideModal' title='close modal (esc)'></i>
        </div>
          <div class="modal-inner-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      modalVisible: this.visible
    };
  },
  props: {
    visible: { type: Boolean, default: false },
    title: {type: String, default: 'Title'}
  },
  watch: {
    visible(value) {
      this.modalVisible = value;
    }
  },
  created() {
    const escapeHandler = e => {
      if (e.key === `Escape` && this.modalVisible) {
        this.hideModal();
      }
    };
    document.addEventListener(`keydown`, escapeHandler);
    this.$once(`hook:destroyed`, () => {
      document.removeEventListener(`keydown`, escapeHandler);
    });
  },
  methods: {
    hideModal() {
      this.modalVisible = false;
      this.$emit("hide-modal");
    }
  }
};
</script>

<style lang="css">
.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  background: rgba(34, 34, 34, 0.8);
}
.modal-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 901;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-body {
  max-width: 75%;
  width: 500px;
  padding: 0 1em;
  color: #4a4a4a;
  background: #fff;
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  border-radius: 6px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.modal-header .fa-times {
  margin: auto 0;
}
.modal-header .fa-times:hover {
  cursor: pointer;
}
.animated {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeOut {
  animation-name: fadeOut;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.fadeOutDown {
  animation-name: fadeOutDown;
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>