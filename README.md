![Title](https://github.com/sht02048/ToInAndB/assets/131152690/15740108-a42b-450f-b78e-2790cba60f1e)

<div align="center">
1945년 고전 게임에서 영감을 받은 아드레날린이 솟구치는 2D 슈팅 게임에 빠져보세요! <br/>
친구들과 격렬한 결투에 도전해서 화려한 우주전쟁을 승리로 이끄세요. <br>

<br>

Written in javascript, **without libraries!** 🎮🕹 <br/>

</br>

<a href="https://toinandb.minsug.dev">
<img alt="play screenshot first stage" src="https://github.com/sht02048/ToInAndB/assets/131152690/b8a99092-7ba3-4308-ad60-7cadb8aea93b"/>
</a>
</div>

</br>

# Quick gameplay intructions
- 방향키: 플레이어 이동
- 스페이스바: 공격
- ESC: 일시정지
- M: 소리 켜기/끄기

</br>

# Game scenes

<div align="center">
  <img height=200 alt="play game" src="https://github.com/sht02048/ToInAndB/assets/131152690/268624d4-606a-431f-8149-64fbec06aa42"/>
  <img height=200 alt="play game" src="https://github.com/sht02048/ToInAndB/assets/131152690/58440145-2ee1-497c-bf28-29e8b1236570"/>
</div>

<br>

<div align="center">
  <img height=200 alt="play game" src="https://github.com/sht02048/ToInAndB/assets/131152690/23221fa8-c1d0-4a2a-8d4b-31c4e53da9ef"/>
  <img height=200 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/bd7a461f-e038-476a-a91a-1d47b98e1755"/>
</div>

</br>
</br>

# Table of Contents

- [What drove me to ToInAndB](#what-drove-me-to-toinandb)
- [Challenges](#challenges)
  - [What the heck is OOP](#what-the-heck-is-oop)
    - [Don't put all your eggs in one basket](#dont-put-all-your-eggs-in-one-basket)
    - [Inheritance VS. Compose](#inheritance-vs-compose)

</br>

# What drove me to ToInAndB
투인앤비는 외부 라이브러리 없이 바닐라 자바스크립트로 만들어진 프로젝트입니다.
과거와 달리 react 혹은 next.js와 같은 웹 개발에 유용한 라이브러리와 프레임워크가 등장으로 자바스크립트 본질에 대한 탐구는 점차 줄어들었습니다.
그러나, 단단한 뿌리 없이 고목이 만들어질 수 없는 것처럼 자바스크립트의 이해가 수반되지 않으면 라이브러리와 프레임워크가 지니고 있는 능력을 100% 활용할 수 없습니다.

이에 자바스크립트를 더 깊이 이해하고 탐구할 수 있는 2D 슈팅 게임을 기획하게 되었습니다.

# Challenges
## What the heck is OOP
게임을 프로그래밍할 때 가장 적합한 패러다임 중 하나는 단연코 객체 지향 프로그래밍(_이하 OOP_)입니다. 게임 내 모든 기물이 특징을 가지고 있는 만큼
개발자가 추상적으로 물체를 정의하고 재사용해서 코드의 효율성과 깔끔함을 효과적으로 유지할 수 있기 때문이지요.

그러나, 머리로 이해하는 것과 실제로 구현하는 것은 너무나도 달라서 투인앤비를 처음 제작할 당시 많은 시행착오를 겪었습니다.

</br>

### Don't put all your eggs in one basket
초기 객체를 구분 지을 때 기준은 그 덩어리가 매우 커서 OOP의 장점을 하나도 적용하지 못했습니다.
그 기준은 바로 "그래픽 적으로 구분될 수 있느냐 없느냐"였습니다. 이 기준에 따르면 플레이어가 조종하는 `Player` 객체는 하나로 인식되어서
`Player Class`에 미사일 발사, 움직임 등 모든 기능을 작성했습니다.

코도로 보면 다음과 같습니다.

```js
class Player {} {
  makeMissile() {};
  launchMissile() {};
  control() {};
  detectCollision() {};
  getTargetDirection() {};
}
```

위와 같은 코드의 문제점은 재사용이 불가능하다는 것이었습니다. 적게는 몇십 줄, 많게는 몇백 줄로 미사일 발사와 충돌 기능 등을 구현해놓았는데 그 기능을 플레이어가 조작하는 객체에 선언해서
적 물체는 쓸 수 없게 되었습니다. 이 상태로 계속 개발을 이어갈 수 없어 1차 리팩토링을 시작했습니다.

이때 객체를 구분하는 기준을 "그래픽"에서 "**기능**"으로 재설정했습니다.

</br>

### Inheritance VS. Compose
디자인 원칙에 "Favoring Compose over Inheritance"라는 말이 있습니다. 이게 무슨 뜻일까요?

투인앤비에 OOP 적용을 결정할 당시 계획은 다른 객체들이 공통적으로 갖고 있어야 할 특징을 하나의 클래스에서 정의한 뒤
상속하는 것이었습니다. 코드로 보면 다음과 같습니다.

```js
class Renderer {
  render() {};
}

class MissileLauncher extends Renderer {
  constructor() {
    this.width = width;
    this.height = height;
    this.missileList = [];
  }
}

class Player extends MissileLauncher {}
class Enemy extends MissileLauncher {}
```
이렇게 생성된 `Player`와 `Enemy는` 같은 특성을 공유함으로 코드를 재사용할 수 있어 효용성이 올라간다고 판단했습니다.
`Renderer에` 문제가 생기기 전까지만 말이죠.

위 코드에서 알 수 있듯이 상속의 장점은 코드의 재사용과 간결함입니다. 그러나, 단점도 존재하는 데 바로 유연성과 확장성입니다.
`Renderer에` 문제가 생겨 수정해야 하는데 이는 곧 `MissileLauncher`와 `Player의` 수정을 의미합니다. 왜냐하면 모두 같은 객체의 속성으로 판단되기 때문입니다.

간단하게 예를 들자면 자바스크립트에서 속성은 거의 모두 prototype 즉, 상속을 통해 전달됩니다. 이때 만약 프로토타입 체인 상 최상위에 존재하는 object에
수정사항이 있다면 무슨 일이 벌어질까요? object로부터 속성을 상속받은 Array 뿐만 아니라 생성자 함수로 만들어진 객체까지 문제가 발생할 수 있습니다.

이번엔 구성에 대해 한번 알아보죠. 구성은 상속과 달리 속성을 할당받는 것이 아닌 생성된 객체의 속성을 이용하는 방식입니다. 코드로 보면 다음과 같습니다.

```js
class Player {
  constructor() {
    this.missileLauncher = new MissileLauncher();
  }
}
```

위와 같은 코드라면 `MissileLauncher의` 속성에 변화가 있더라도 `Player의` 속성은 영향을 받지 않습니다. 다시 말하자면 구성은 상속에 비해 **높은 응집도와 낮은 결합도**를 갖고 있습니다.
그렇다고 해서 구성이 무조건 올은 것은 아닙니다. 상황에 따라 쓰임새가 다를 뿐입니다. 그리고 그 쓰임새는 다음과 같이 구분할 수 있습니다.

만약 객체와 특성 간의 관계가 A is B라면 상속이 적합하고,
만약 A has B라면 구성이 적합하다고 볼 수 있습니다.

다시 1차 리펙토링으로 돌아가 보자면 그떄의 기준은 기능이었습니다. 그리고 위에서 설명한 것과 같이 단순히 기능만으로 객체를 디자인하는 것에 부족함을 느껴 2차 리펙토링을 시작했습니다.

이때 객체 디자인의 기준은 **기능 + 객체 간의 관계**(Is or Has)로 재설정되었습니다.

그 결과, 게임 내 기물이 당연히 가지고 있어야할 특징과 정체성이 코드에 그대로 반영되었습니다.
예를 들아, Player라는 기물은 우주선이며 미사일 발사기와 충돌 감지기를 탑재하고 있다는 것을
코드만 보고도 바로 알 수 있게 되었습니다.

**새 기준 적용 결과 코드**
```js
class Player extends SpaceShip {
  constructor() {
    this.missileLauncher = new MissileLauncher();
    this.collisionDetector = new CollisionDetector();
  }
}
```
