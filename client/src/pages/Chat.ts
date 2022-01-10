import { Components } from "view";

class Chat extends Components {
  constructor() {
    super();
  }

  template() {
    return `
      <div>
        채팅페이지 입니다
      </div>
    `;
  }

  methods() {
    return {};
  }

  render() {
    console.log("채팅페이지");
    return this.$parent;
  }
}

export default Chat;
