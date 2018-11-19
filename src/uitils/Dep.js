class Dep {
  constructor() {
    this.deps = [];
  }

  add(element) {
    this.deps.push(element);
  }

  notify() {
    for (let i = 0; i < this.deps.length; i++) {
      this.deps[i]();
    }
    this.deps.length = 0;
  }
}

export default Dep;