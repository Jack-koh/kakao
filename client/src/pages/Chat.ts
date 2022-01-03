interface Chat {
  wrapper: HTMLElement;
}

class Chat {
  constructor() {
    this.wrapper = document.createElement("div");
    this.wrapper.textContent = "채팅페이지 입니다";
  }

  render() {
    console.log("채팅페이지");
    return this.wrapper;
  }
}

export default Chat;
