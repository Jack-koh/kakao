interface Main {
  wrapper: HTMLElement;
}

class Main {
  constructor() {
    this.wrapper = document.createElement("div");
    this.wrapper.textContent = "메인페이지 입니다";
  }

  render() {
    console.log("메인페이지");
    return this.wrapper;
  }
}

export default Main;
