class LazyLoad {
  constructor(el) {
    this.imglist = Array.from(document.querySelectorAll(el));
    this.init();
  }

  canILoad() {
    let imglist = this.imglist;
    for (let i = imglist.length; i--; ) {
      this.getBound(imglist[i]) && this.loadImage(imglist[i], i);
    }
  }
  getBound(el) {
    let bound = el.getBoundingClientRect();
    let clientHeight = window.innerHeight;
    return bound.top <= clientHeight - 30;
  }

  loadImage(el, index) {
    let src = el.getAttribute("data-original");
    el.src = src;
    this.imglist = [
      ...this.imglist.slice(0, index),
      ...this.imglist.slice(index + 1)
    ];
  }

  bindEvent() {
    window.addEventListener("scroll", () => {
      this.canILoad();
    });
  }

  init() {
    this.canILoad();
    this.bindEvent();
  }
}

const lazy = new LazyLoad(".lazyload");
