import Modal from './Modal.vue';

let modal = null;

const defineGetter = (target, key, get) => Object.defineProperty(target, key, {get});

export default {
  install(Vue, options) {
    Modal.components = options.components;
    Vue.component('Modal', Modal);
    const currentModal = Vue.observable({
      name: undefined,
      data: {}
    });
    function update(name, data) {
      currentModal.name = name;
      currentModal.data = data || {};
    }
    function close() {
      update(undefined, {});
    }
    const $modal = {
      currentModal,
      update,
      close,
    };
    defineGetter($modal, 'name', () => currentModal.name);
    defineGetter($modal, 'data', () => currentModal.data);
    modal = $modal;
    Vue.prototype.$modal = $modal;
  },
};

export function useModal() {
  return modal;
};
