import { Components } from "view";
import Logo from "assets/img/kakao_logo.png";
import "./Login.scss";

export class Login extends Components {
  constructor() {
    super({
      state: {
        email: "",
        password: "",
        number: [1, 2, 3, 4, 5],
      },
    });
  }

  template() {
    return `
      <div id="login-page">
        <div class="main-content">
          <div class="login-field">
            <div class="kakao-logo">
              <img src=${Logo} alt="kakao_logo" />
            </div>
            <div class="input-field">
              <input v-onchange="email"/>
              <input v-onchange="password"/>
            </div>
            <input type="button" id="submit" value="로그인" v-onclick="number"/>
          </div>
        </div>
        <div class="footer">
          ${this.state.number.join(", ")}
        </div>
      </div>
    `;
  }

  methods() {
    const { state, setState } = this;
    return {
      email(e: Event) {
        const target = e.target as HTMLInputElement;
        setState({ ...state, email: target.value });
      },
      password(e: Event) {
        const target = e.target as HTMLInputElement;
        setState({ ...state, password: target.value });
      },
      number() {
        const { number } = state;
        number.push(number[number.length - 1] + 1);
        setState({ ...state, number });
      },
    };
  }
}

// <div id="login-page">
// <div id="button" v-onclick="home">홈버튼</div>
// <div v-onclick="main">메인버튼</div>
// <div v-onclick="chat">쳇버튼</div>
// ${Router.outlet()}
// </div>
