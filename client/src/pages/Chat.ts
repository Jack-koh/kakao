import { Components } from "view";

class Chat extends Components {
  constructor() {
    super();
    console.log("Chat");
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
}

export default Chat;
