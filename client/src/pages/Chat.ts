import { Components } from "view";

interface Chat {
  $parent: HTMLElement;
}

class Chat extends Components {
  constructor() {
    super();
    this.$parent = document.createElement("div");
    this.$parent.textContent = "채팅페이지 입니다";
  }

  render() {
    console.log("채팅페이지");
    return this.$parent;
  }
}

export default Chat;
