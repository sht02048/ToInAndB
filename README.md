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

# Table of Contents

- [게임 플레이 가이드](#게임-플레이-가이드)
- [게임 스테이지](#게임-스테이지)
- [투인앤비의 탄생 배경](#투인앤비의-탄생배경)
- [개발 중 마주한 챌린지](#개발-중-마주한-챌린지)
  - [객체지향 프로그래밍 적용기](#객체지향-프로그래밍-적용기)
    - [1. 투인앤비의 객체지향 프로그래밍](#1-투인앤비의-객체지향-프로그래밍)
    - [2. 하나의 클래스는 하나의 기능만 수행하기](#2-하나의-클래스는-하나의-기능만-수행하기)
    - [3. 객체 확장을 올바르게 하는 법](#3-객체-확장을-올바르게-하는-법)
    - [4. 적용기는 아직 끝나지 않았다](#4-적용기는-아직-끝나지-않았다)
  - [다른 환경에서 게임 속도를 어떻게 동일하게 맞출 수 있을까?](#다른-환경에서-게임-속도를-어떻게-동일하게-맞출-수-있을까)
    - [1. 모니터 주파수에 영향을 받는 `requestAnimationFrame`](#1-모니터-주파수에-영향을-받는-requestanimationframe)
    - [2. 델타 타임(delta time) 에니메이션 적용하기](#2-델타-타임delta-time-애니메이션-적용하기)
      - [2.1 나만 몰랐던 델타 타임 기법](#21-나만-몰랐던-델타-타임-기법)
      - [2.2 게임 라이브러리 소스코드를 비교해보자](#22-게임-라이브러리-소스코드를-비교해보자)
- [배운 것 그리고 개선할 점](#배운-것-그리고-개선할-점)
  - [처음 적용할 수록 돌아가자](#처음-적용할-수록-돌아가자)
  - [무조건 옳은 것은 없다, 다만 상황에 알맞은 것만 있을 뿐이다](#무조건-옳은-것은-없다-다만-상황에-알맞은-것만-있을-뿐이다)
  - [이런 이유로 라이브러리를 사용하는 구나](#이런-이유로-라이브러리를-사용하는-구나)
  - [무에서 유를 창조하는 경험](#무에서-유를-창조하는-경험)

</br>

# 게임 플레이 가이드
- 방향키: 플레이어 이동
- 스페이스바: 공격
- ESC: 일시정지
- M: 소리 켜기/끄기

</br>

# 게임 스테이지

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

# 투인앤비의 탄생배경
투인앤비는 바닐라 자바스크립트와 객체지향 프로그램밍으로 설계된 프로젝트입니다. 외부 라이브러리를 사용하지 않은 이유는 두 가지가 있습니다. 첫 번째는 자바스크립트를 깊이 공부하고 이해하기 위해서 입니다. 과거 바닐라 자바스크립트로 웹 설계를 했던 것과 달리 현대에는 `React`와 `Vue` 등 다양한 라이브러리와 프레임워크의 등장으로 자바스크립트 본질를 탐구할 수 있는 기회가 제한되었습니다. 그러나, 단단한 뿌리없이 고목이 만들어질 수 없는 것처럼 자바스크립트의 깊은 이해가 수반되지 않으면 라이브러리와 프레임워크가 지니고 있는 능력을 100%활용할 수 없습니다. 이에 자바스크립트를 조금 더 깊이 파고들고자 했습니다.

두 번째 이유는 라이브러리의 강력함을 경험하고 바닐라 자바스크립트의 한계점을 파악하기 위해서입니다. 라이브러리의 사용이 당연해짐으로 그것이 제공하는 편리함과 유용성을 파악하지 못하는 상황을 많이 경험했습니다. 예를 들어, `Redux`의 강력한 특징 중 하나인 예측 가능하다는 점은 `React`에서 특별히 느끼기 힘듭니다. 왜냐하면 `React`가 단방향 상태 관리를 사용하기 때문입니다. 반면에, 양방향 데이터 흐름을 사용하는 `Angular`를 경험헤봤다면 `Redux`의 예측가능하다는 장점이 얼마나 편리한지 쉽게 알 수 있습니다. 이처럼 바닐라 자바스크립트만을 사용함으로 시야를 넓히고 라이브러리 채택을 더 합리적으로 할 수 있는 능력을 키우고자 했습니다.

> 바닐라 자바스크립트를 사용한 이유
> 1. 라이브러리를 100% 사용하기 위해 근본이 되는 자바스크립트를 깊이 이해하고자
> 2. 시야를 넓히고 라이브러리 채택을 더 합리적으로 할 수 있는 능력을 키우기 위해서

객체지향 프로그램밍으로 투인앤비를 설계한 이유는 투인앤비 속 전투기들을 관계성이 있는 객체들의 집합으로 해석했기 때문입니다. 이러한 객체들을 단순 함수들의 나열해서 절차지향적으로 설계하는 것보다 객체로 구분지어 특징을 추상화하는 것이 코드를 보다 유연하게 만들고 유지보수성에 있어서도 더 뛰어나다고 판단했습니다. 실제로 모든 전투기의 시작이 되는 Spaceship 클래스를 추상화함으로 전투기의 속성을 하나의 파일에서 관리할 수 있었습니다.

# 개발 중 마주한 챌린지

## 객체지향 프로그래밍 적용기

게임 기물의 개념과 기능을 추상화해서 모델링할 수 있다는 점에서 객체지향 프로그래밍(_이하 OOP_)은 투인앤비에 적합한 패러디임입니다. 그러나, 문서를 읽고 이해하는 것과 실제 코드로 구현하는 작업은 매우 달랐습니다. 객체를 구분짓는 기준을 정하는 것부터 OOP의 네 가지 기둥(추상화,상속, 다형성, 캡슐화)과 SOLID 법칙을 코드에 적용하는 데까지 많은 시행착오를 겪었어야 했습니다. 이 중 가장 먼저 대면했던 문제는 객체의 구분 기준이었습니다.

> 문제 상황과 문제 해결 방법을 서술하기전에 투인앤비를 설계한 OOP를 설명하고 정의하고자 합니다. OOP를 이해하고 계시다면 [2. 하나의 클래스는 하나의 기능만 수행하기](#2-하나의-클래스는-하나의-기능만-수행하기)로 이동해주세요.

</br>

### 1. 투인앤비의 객체지향 프로그래밍

컴퓨터에게 명령하기 위해서 코드가 필요하지만 작성하는 주체가 사람인만큼 가독성도 중요합니다. 같은 기능을 수행하는 코드라도 체계적으로 구조가 잡힌 코드는 그렇지 않은 코드보다 유지보수하기에 편리하며 확장도 비교적 손쉽게 할 수 있습니다. 이런 의미에서 OOP는 프로그램의 성능을 개선시키는 것이 아닌 프로그램을 인간 친화적으로 설계하는데 도움이 되는 소프트웨어 아키텍처입니다.

OOP는 기본적으로 인간의 사고적 원리를 프로그래밍에 적용한 형태를 띄고 있습니다. 인간이 사물의 속성과 기능을 정리해서 기억하고 있는 것처럼 OOP도 컴퓨터 세상 속 사물을 정의하게 합니다. 예를 들어, 학생이 4 개의 다리가 상판을 받치고 있는 물체를 책상으로 정의하는 것처럼 OOP로 제작된 프로그램도 아이디와 비밀번호를 입력받는 input을 가진 form을 로그인 form으로 정의할 수 있습니다. 이렇게 OOP는 객체의 속성과 기능을 추상화해서 정의할 수 있으며, 정의된 객체들의 집합이 상호작용하는 프르그래밍 세계를 만드는 소프트웨어 디자인입니다.

> *추상화란 다른 종류의 객체로부터 식별될 수 있는 객체의 본질적인 특징이다.*
> </br>
>그래디 부치(Grady Booch)

</br>

OOP를 투인앤비에 적용함으로 얻게 된 이점은 두 가지가 있었습니다. 첫 번째는 개발자가 코드를 직관적으로 읽을 수 있다는 것이며 두 번째는 코드의 재사용성 및 확장성 증가했다는 점입니다. 게임 속 전투기를 사람이 사고하는 방식으로 설계했기 때문에 속성과 기능을 쉽게 이해할 수 있었습니다. 또, 반복되거나 확장이 필요한 객체는 구성과 상속 등으로 손쉽게 구현할 수 있었습니다.
어떻게 위와 같은 이점을 얻게 됐는지 그 과정을 설명드리겠습니다.

> OOP는 투인앤비 세계를 체계적으로 구축하는데 사용된 도구와 같습니다.

</br>

### 2. 하나의 클래스는 하나의 기능만 수행하기

OOP를 본격적으로 적용하기에 앞서 객체를 생성하고 나누는 기준을 명확히 설정할 필요가 있었습니다. 개발 초기 기준은 “그래픽”으로 생김새가 상이하다면 다른 객체로 규정짓고 클래스를 생성했습니다. 예를 들어, 게임 배경과 전투기는 그래픽적으로 상이하기에 다른 객체로 규정할 수 있습니다. 마찬가지로 같은 전투기라도 플레이어 전투기와 보스 전투기의 생김새가 다르기에 다른 객체입니다.

<div align="center">
  <img height=200 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/d26846ab-7ce3-4ef3-a75a-e0c28f12d4be"/>
</div>

</br>

객체 구분 기준을 그래픽으로 설정한 이유는 웹 개발 시 UI를 컴포넌트화했던 습관이었는데 이는 큰 패착이었습니다. 왜냐하면 그래픽으로 구분지어진 객체는 같은 기능을 수행하더라도 코드를 재사용할 수 없는 상황이 빈번하게 나타났기 때문입니다. 게임 배경과 플레이어 전투기는 기능적으로 완벽하게 다르게 때문에 동일한 코드가 없습니다. 반면에, 플레이어 전투기와 적 전투기는 비행과 공격 등 동일한 기능을 수행하지만 코드 베이스를 공유하지 않았습니다. 이는 OOP라고 할 수 없는 코드 구조 였습니다.

OOP는 개념과 기능을 추상화해서 객체를 생성하는 만큼 유사한 기능을 하는 객체는 같은 클래스에서 파생하며 확장이 필요한 경우 상속과 구성 등을 사용합니다. 그러나, 그래픽적으로 객체를 나누는 다는 것은

1. OOP에서 정의하는 추상화와 아예 맞지 않을 뿐더러
2. 코드 효율성에 있어서도 장점이 없습니다.

실제로 전투기의 비행과 공격 코드는 적게는 몇십 줄, 많게는 몇백 줄로 플레이어 전투기와 적 전투기 클래스에서 각각 선언되었습니다.

> 객체를 구분짓는 기준이 그래픽일때 발생한 문제는 코드의 재사용성이 매우 떨어진다는 것이었습니다.

</br>

이에 OOP를 조금 더 조사하고 개념과 기능을 추상화한다는 특징을 적용해 객체 구분 기준으로 그래픽에서 “기능”으로 재설정했습니다.

<div align="center">
  <img height=200 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/04e7fb9a-0bff-4447-9d38-32d48c5a3b9f"/>
</div>

</br>

객체 구분 기준을 기능으로 설정하면서 플레이어 전투기와 적 전투기를 모두 동일한 Spaceship 클래스로 인스턴스화했습니다. 하지만, 이 Spaceship 클래스 내에 여러 기능이 통합되어 있어 시스템의 확장성과 유지보수성이 제한되었습니다. 이 문제를 인식하고 SOLID 원칙 중에서도 **단일 책임 원칙**(Single Responsibility Principle)을 적용하여 해결하기로 결정했습니다. 단일 책임 원칙(_이하 SRA_)은 객체(클래스)가 오직 하나의 책임만을 가져야 함을 명시하고 있으며, 여기서 '책임'은 클래스가 수행하는 주된 기능을 지칭합니다. 이로 인해 얻는 이점은 객체의 목적성이 명확해지며 기능 간의 결합도를 약화시킵니다.

> 단일 책임 원칙의 적용 이유는 코드의 일관성을 유지할 수 있는 가장 좋은 기준이라고 판단했기 때문입니다.

</br>

SRA를 Spaceship 클래스에 적용한 결과, 복합적으로 선언되어있던 기능을 CollisionDetector, MissileLauncher, Cockpit 등 여러 하위 클래스로 나누었습니다. 각 클래스의 목적이 뚜렷해져 가독성이 개선되었을 뿐만 아니라 결합도가 낮아져 확장 및 수정에 있어서도 유연하게 되었습니다.

<div align="center">
  <img width=500 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/65f6bc31-64a7-4767-b48e-ec81e339f27d"/>
</div>

</br>

> 단일 책임 원칙은 언뜻보면 적용하기 쉬워보이지만 책임의 범위를 정하는 것이 상당히 까다롭습니다. 투인앤비의 Spaceship 클래스를 나눌 때 책임의 범위는 실제 전투기 기능에 빗대서 지정했으며 만약 실제 전투기 파츠로 구분지어진다면 그건 다른 책임이라고 판단했습니다.

</br>

### 3. 객체 확장을 올바르게 하는 법

투인앤비는 다른 행동 패턴을 지니고 있는 10개 이상의 적 전투기를 효율적으로 구현하기 위해서 **개방 폐쇄 원칙**(Open and Close Principle)과 **Is or Has 원칙**에 근거하여 객체를 확장했습니다. 개방 폐쇄 원칙(_이하 OCP_)이란 기존 코드를 확장하는데 있어서 개방적이지만 수정은 폐쇄적이어야한다는 의미입니다. 개방과 폐쇄는 각각 다음과 같은 특징을 가집니다.

|  | 의미 | 특징 | 공통점 |
| --- | --- | --- | --- |
| 확장을 개방 | 객체의 새로은 기능을 추가하는데 제한이 없음 | 변경 사항을 유연하게 코드에 추가할 수 있음 | 유지보수 비용의 저하 |
| 수정은 폐쇄 | 객체를 직접적으로 변경하는 것을 제한함 | 직접적으로 객체를 수정할 수 없기 때문에 확장을 강요 | 유지보수 비용의 저하 |

</br>

투인앤비에서 개방 폐쇄 원칙을 가장 잘 보여줄 수 있는 클래스는 Spaceship입니다. 모든 전투기는 공격 기능이 있지만 어떻게 공격할지는 전투기마다 다릅니다. 따라서, 공격 정보를 설정하는 `setMissileInfomration` 함수를 선언하되 공격 기능을 실행하는 것은 각 전투기에서 실행되도록 했습니다. 이로 인해 새로운 패턴을 가진 전투기를 기획할때마다 Spaceship을 수정할 필요가 없어졌으며 `setMissileInformation`만 커스터마이즈하여 간단하게 생성할 수 있었습니다.

> 그러나, 한 가지 문제가 발생하였는데 바로 확장을 어떤 방식으로 하느냐 였습니다.
> </br>
> 그리고 이를 **Is or Has** 원칙으로 해결했습니다.

</br>

클래스를 확장할 수 있는 방식에는 상속과 구성이 있습니다. 그러나, 체계적으로 구조가 잡힌 코드를 작성하기 위해서는 상속과 구성을 명확히 구분지어서 사용할 필요가 있었습니다. 상속은 부모 클래스의 속성 및 기능을 모두 이어받아 원본을 유지 혹은 변경할 수 있습니다. 이는 코드를 간결하게 만들고 다형성을 보장하기 때문에 기능 추가 및 수정에 있어서도 용이합니다. 반면에 구성은 한 클래스의 속성과 기능을 다른 클래스에 포함시키는 것을 의미합니다. 상속과 달리 타 클래스의 속성이 자신의 속성이 되는 것이 아니라서 결합도가 낮아 코드 변경에 유연합니다. 그렇다면 어떤 상황에서 상속과 구성이 적합하다고 판단할 수 있을까요?

이에 대해 조사해본 결과 OOP에는 *Favoring Composition over Inheritance*라는 말로 구성보다 상속을 선호하는 움직임이 있습니다. 그들이 구성 선호룰 주장하는 이유는 다음과 같았습니다.

- **향상된 유연성**: 구성을 사용하면 인터페이스에 맞는 클래스로 시스템의 일부를 손쉽게 교체할 수 있다. 반면에, 상속을 사용하면 계층화된 구조때문에 변경에 제약이 있다.
- **취약성 증가**: 상속을 사용하면 기본 클래스에 문제가 발생했을 때 모든 하위 클래스에 영향을 줄 수 있어 버그를 초래할 수 있다. 구성은 변경 사항을 컴포넌트 내부로 제한하여 예기치 않은 부작용을 최소화한다.
- **깊은 상속 계층 구조 회피**: 깊은 상속 트리는 관리하고 이해하기 어려울 수 있다. 구성을 사용하면 일반적으로 작업하기 쉽고 이해하기 쉬운 평평한 구조를 만들 수 있다.

실제로 구성은 추가하고 제거하는 등 다른 클래스에서 사용하기 용이하지만 상속은 한번 얽히면 계층 구조에 영향을 받아 유연하지 못합니다.
확장에 있어서 기준을 정하는 만큼 확실하게 조사해야했기에 저 주장이 모든 상황에서 구성을 사용하라는 말인지 확인할 필요가 있었습니다.

> 그럼 확장해야하는 상황에서 구성을 사용하는 게 무조건 옳은 걸까..?

</br>

구성과 상속의 특징은 명확하기 때문에 상황에 따라 알맞는 기능이 있다고 판단했습니다. 다시 상속을 정리해보면 부모 클래스의 속성이 자기 것이 되는 반면에 구성은 다른 클래스의 속성을 사용합니다. 이를 다른 말로 하면 상속은 A와 B가 동등 관계에 있지만 구성은 A가 B를 사용하는 것입니다. 그리고 이를 정리한 것이 OOP에 자주 등장하는 Is or Has 원칙입니다. 만약 A를 B라고 할 수 있을때 A와 B는 상속 관계이며, A가 B를 가지는 형태는 A와 B가 구성 관계라는 것을 의미합니다. 이렇게 관계를 정의하면 상속의 낮은 유연성을 어느정도 해소하면서 코드의 간결함이라는 장점을 취할 수 있습니다.

> **Is or Has 원칙**
> </br>
> A가 B라면(is) 상속,
> </br>
> A가 B를 소유(has)한다면 구성이라고 정의

투인앤비의 Player 클래스는 상속과 구성을 모두 지닌 형태를 가지고 있습니다. 우선, Player는 전투기임으로 Spaceship 클래스를 상속받습니다. 그와 동시에 미사일 발사기와 조종석 등을 탑재하기 때문에 이는 구성으로 확장되었습니다.

```js
class Player extends SpaceShip {
  constructor() {
    this.missileLauncher = new MissileLauncher();
    this.collisionDetector = new CollisionDetector();
  }
}
```

</br>

### 4. 적용기는 아직 끝나지 않았다

OOP를 공부하고 코드에 적용해나감에 따라 기존 코드의 결점이 계속해서 보였습니다. 기준과 원칙에 근거해서 작성했다고 믿은 코드들이 잘못된 방향으로 쓰여져 있는 모습을 많이 발견했습니다. 대표적으로 MissileLauncher 클래스가있습니다. 만약 이 클래스가 SOLID 원칙을 철저히 지켜서 구현되었다면 두 개 이상의 클래스로 나뉘어야 했지만 지금은 너무나 많은 기능들이 선언되었습니다.

> MissileLauncher는 기본 공격만 담당할 예정이며 이를 상속받은 다른 클래스(GuidedMissileLauncher 등)가 변형 공격을 구현할 예정입니다.

</br>

앞서 정의한 OOP의 정의와 원칙을 기반으로 효율적인 코드로 지속 개선시켜나갈 계획입니다.

</br>

## 다른 환경에서 게임 속도를 어떻게 동일하게 맞출 수 있을까?

슈팅 게임에서 움직임 속도는 난이도와 게임 경험에 큰 영향을 미친다는 점에서 매우 중요합니다. 이러한 점에서 최적의 게임 경험을 유저에게 제공하기 위해 플레이어 전투기 속도는 맵 x축 좌측 끝에서 우측 끝까지 약 3.5초에 이동할 수 있도록 조정되어 있었습니다. 그리고 그 속도가 다른 전투기나 탄환을 속도를 결정짓는 기준이 되었습니다.

그러나, 이 기준을 계속 유지할 수 없었는데 그 이유는 모니터 크기에 따라 맵의 크기가 달라지는 것도 있었지만 결정적으로 모니터의 주파수에 따라 속도가 변경되었기 때문입니다.


<div align="center">

**모니터 주파수에 따라 달라지는 전투기의 속도**

<img width=500 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/6501ac2f-c512-4df9-a563-673cd8edbf1a"/>

</div>

</br>

### 1. 모니터 주파수에 영향을 받는 `requestAnimationFrame`

모니터 주파수에 따라 속도가 변경된 이유는 애니매이션 구현에 `requestAnimationFrame`(_이하 rFA_)을 사용했기 떄문입니다. rFA를 이해하기 위해서는 먼저 Task Queue가 뭔지 알아야합니다.

자바스크립트는 싱글 스레드 언어로 비동기 작업이 원칙적으로 불가능합니다. 그러나, 서버와 소통 등 비동기적으로 실행되어야하는 프로세스가 있기에 이를 브라우저에서 처리합니다. 그리고 비동기 작업이 가능한 메서드를 Web API라고 통칭합니다. Web API가 브라우저에서 실행되고 나서 실행 결과를 자바스크립트 엔진에게 전하기 전에 잠시 대기하는 곳이 Task Queue입니다.

<div align="center">
  <img width=400 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/12aca8d7-1886-430d-9865-eb91238e82f8"/>
</div>

</br>

> 실행이 끝난 Web API의 콜백은 콜 스택이 비워지기전까지 Task Queue에서 대기합니다.

</br>

Task Queue는 큐의 특징과 큐에 담기는 메서드에 따라 종류에 따라 세 가지로 나뉠 수 있습니다.

- Micro Task Queue: `promise`와 `mutationObserver` 콜백이 담기는 큐로 다른 큐들을 방문하기 이전에 그리고 렌더링 이전에 처리됩니다.
- Animation Frame Queue:  `requestAnimationFrame` 콜백이 담기는 큐로, 렌더링 단계 전에 실행되어 화면 업데이트를 준비합니다. 그러나 이 큐는 Macro Task Queue나 Micro Task Queue와는 별개로, 렌더링 사이클에 따라 관리되며, **일반적으로 매 화면 갱신마다 실행됩니다.**
- Macro Task Queue: `setTimeout`, `setInterval`, I/O 작업, UI 이벤트 (예: 마우스 클릭, 키보드 입력) 및 기타 대부분의 비동기 콜백이 담깁니다. Macro Task는 한 번에 하나씩 처리됩니다.

여기서 집중해야될 것은 Animation Frame Queue가 매 화면 갱신마다 실행된다는 점입니다. 다시 말해서, 모니터 주파수에 맞게 렌더링이 최적화된다는 뜻입니다. 이게 특별한 이유는 애니메이션을 구현하는 다른 Web API들은 프레임 밀림 현상을 보일뿐더러 애니메이션 최적화를 할 수 없기 때문입니다.

> `requestAnimationFrame`은 2010년 웹킷에서 처음 도입된 후 2015년부터 다른 브라우저에서도 사용이 가능해졌습니다.

</br>

위와 같은 이유에서 투인앤비도 처음에는 `rFA`을 사용했었습니다. 그런데 모니터의 주파수에 따라 게임 속도가 달라지니 이를 해결할 필요가 생겼습니다.

</br>

### 2. 델타 타임(delta time) 애니메이션으로 게임 속도 해결하기

모니터 주파수 문제를 해결할 방법으로 초기에 생각했던 것은 아래 두 가지였습니다.

1. `setInterval`로 렌더링 횟수 고정하기
2. 모니터 주파수 확인 후 가변적으로 속도 변수 조정하기

`setInterval`은 `rFA`을 대체할 수 있는 메서드로 시간을 이용하기 때문에 주파수와 관계없이 1초에 렌더링되는 횟수를 고정할 수 있다는 장점이 있습니다. 그러나, 단점도 존재하는데 렌더링과 관계없이 실행되기 때문에 프레임 밀림 현상이 발생하며 렌더링전에 콜백 함수가 실행된다는 보장이 없습니다.

예를 들어, `setInterval`에 담긴 콜백을 1초에 60번 실행시키기 위해서는 1000 / 60를 두번째 인자로 주어야하는데 두번째 인자는 정수로만 입력 가능해서 자동으로 16.666..ms를 17ms로 변환합니다. 이렇게 되면 1초에 60번 실행이 불가능함으로 프레임 밀림 현상이 발생할 수 있게 됩니다. 실제로 투인앤비도 프레임 밀림 현상을 목격할 수 있었습니다.

반면에 모니터 주파수를 확인하고 가변적으로 속도 변수를 조정하는 방법은 `rFA`를 사용하는 덕에 `setInterval`가지고 있는 단점을 모두 상쇄하지만 모니터 주파수를 확인할때 최대 1초 이상 시간이 소요된다는 단점이 존재했습니다. 즉, 위 2 가지 방법 모두 최선의 방법은 아니었기에 다른 해결책을 찾아야했습니다.

> 모니터의 주파수를 확인한다는 발상이 너무나 메뉴얼적이라는 생각에 처음 해결 방법으로 `setInterval`을 채택했었는데 지금 생각해보면 그래도 주파수에 맞춰 속도 변수를 조정하는 것이 브라우저 리소스 소요 부분과 게임 플레이 최적화를 고려했을때 더 효율적인 방식이었던 것 같습니다.

</br>

### 2.1 나만 몰랐던 델타 타임 기법

여러 방면으로 해결책을 강구하던 중 문득 이런 생각을 들었습니다. "**자바스크립트 게임 라이브러리는 이 문제를 어떻게 해결했을까?**" 애니메이션 최적화를 위해서 `rFA`를 사용했다면 이 문제를 마주할 수 밖에 없었기 때문입니다. 그래서 자바스크립트 게임 라이브러리 중 가장 많이 사용되는 PixiJS와 PhaserJS의 소스코드를 찾아보았습니다. 그 결과, 두 라이브러리 모두 `rFA`를 사용하고 있었으며 가변적인 FPS를 해결하기 위해 [델타 타임 기법](https://en.wikipedia.org/wiki/Delta_timing)을 사용하고 있었습니다.

|  | 공통점 | 차이점 |
|---|---|---|
| PixiJS | 델타 타임 애니메이션으로 주파수 문제를 해결 | 타겟과 최소 FPS를 설정 |
| PhaserJS | 델타 타임 애니메이션으로 주파수 문제를 해결| 최대와 최소 FPS를 설정 |

> Unity 게임 엔진 또한 델타 타임을 이용해서 렌더링합니다.

</br>

위 두 라이브러리뿐만 아니라 게임 엔진 대부분 델타 타임을 렌더링에 사용하는데 그 이유는 렌더링 횟수가 고정적일 수 없기 때문입니다.
지금은 모니터의 스펙에 따라 프레임 횟수가 결정됐지만 CPU 혹은 GPU 등 성능에 영향을 미치는 부품들도 품질에 따라서 편차가 있습니다. 그래서 절대적인 기준인 시간을 사용하는 것입니다.
그럼 델타 타임인지 무엇인지 한번 알아보겠습니다.

델타 타임이란 이전 프레임과 다음 프레임 사이의 시간 간격을 의미합니다. 그래서 델타 타임을 경과했다는 의미로 elapsed time으로 대체해서 사용하기도 합니다.
델타 타임은 매 프레임이 실행될때마다 갱신해야합니다. 고정값이 아니라 변동되는 값이라는 의미입니다. 매 프레임마다 갱신되기 떄문에 델타 타임 * 스피드를 하면 항상 같은 시간 내에 같은 거리를 이동할 수 있는 것을 보장할 수 있습니다. 그럼 델타 타임이 코드로 어떻게 구현될 수 있는지 보겠습니다. 다음은 기본적인 델타 타임 애니메이션 코드입니다.

```js
let lastTime = 0;

function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = (timestamp - lastTime) / 1000;  // 델타 타임을 초 단위로 계산

    // 여기에서 델타 타임을 사용하여 애니메이션 또는 게임 로직을 업데이트
    object.position.x += 100 * deltaTime; // 1번

    lastTime = timestamp;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

</br>

1. `rFA`은 콜백 함수에 첫 번째 인자로 현재 프레임의 종료 시간을 나타내는 `DOMHighResTimeStamp`을 전달합니다.
2. 이전 프레임과 현재 프레임 종료 시간의 차를 milliSeconds로 변환해서 `deltaTime`에 할당합니다.
3. `deltaTime` * 100만큼 `object`의 x축을 이동시킵니다.

FPS가 1인 모니터와 FPS가 0.5인 모니터가 있다고 가정하고 4초간 위 함수를 실행 시 각 모니터의 `object`는 같은 거리를 이동할 것입니다.

| object의 이동거리 | FPS 1 | FPS 0.5 |
|---|---|---|
| 1초 | 0.1 | - |
| 2초 | 0.2 | 0.2 |
| 3초 | 0.3 | - |
| 4초 | 0.4 | 0.4 |

> 예시를 보여드리기 위해 FPS를 가정해서 렌더링되지 않는 구간이 있지만 실제 FPS는 이보다 훨씬 높기 때문에 1초만큼 긴 시간동안 리렌더링이 발생하지 않을 확률은 매우 적습니다.

</br>

### 2.2 게임 라이브러리 소스코드를 비교해보자

델타 타임의 원리는 이해했지만 올바르게 적용하기 위해서는 사례를 연구할 필요가 있었습니다.
위 표에서 나타내듯이 두 라이브러리는 접근법이 달랐기에 어떤 것이 투인앤비의 상황에 더 적합한지 알아보았습니다.

먼저, PhaserJS가 사용한 방법을 먼저 보겠습니다.
<details>
  <summary><b>PhaserJS의 소스코드</b></summary>

  ```js
    update: function (time, delta)
    {
        // 1. 게임이 중지중인지 혹은 update 해야할 물체가 있는지 확인합니다.
        if (this.isPaused || this.bodies.size === 0)
        {
            return;
        }

        var i;
        var fixedDelta = this._frameTime;
        var msPerFrame = this._frameTimeMS * this.timeScale;

        this._elapsed += delta;

        var body;
        var bodies = this.bodies.entries;

        //  실제 경과시간과 유저가 지정한 FPS를 비교해서 update 실행 유무를 결정합니다.
        var willStep = (this._elapsed >= msPerFrame);

        // 만약 fixedStep을 사용(true)한다면 델타 타임을 사용하지 않습니다.
        // fixedStep을 사용하지(false) 않는다면 update를 무조건 실행시키며 델타 타임을 사용합니다.
        if (!this.fixedStep)
        {
            fixedDelta = delta * 0.001;
            willStep = true;
            this._elapsed = 0;
        }

        for (i = 0; i < bodies.length; i++)
        {
            body = bodies[i];

            if (body.enable)
            {
                body.preUpdate(willStep, fixedDelta);
            }
        }

        // willStep이 true라면 물체를 update합니다.
        if (willStep)
        {
            this._elapsed -= msPerFrame;
            this.stepsLastFrame = 1;

            if (this.useTree)
            {
                this.tree.clear();
                this.tree.load(bodies);
            }

            var colliders = this.colliders.update();

            for (i = 0; i < colliders.length; i++)
            {
                var collider = colliders[i];

                if (collider.active)
                {
                    collider.update();
                }
            }

            this.emit(Events.WORLD_STEP, fixedDelta);
        }

        while (this._elapsed >= msPerFrame)
        {
            this._elapsed -= msPerFrame;

            this.step(fixedDelta);
        }
    },
  ```

</details>

PhaserJS의 가장 큰 특징은 `fixedStep의` 값에 따라 델타 타임 애니메이션 사용 유무가 결정된다는 것입니다.
만약 `fixedStep`이 `true`라면 경과 시간이 유저가 지정한 시간보다 크거나 같을때 실행되며 경과 시간의 값과 관계없이 고정된 값으로 `update`됩니다.
예를 들어, 지정 시간이 0.1초 이라고 할때 경과 시간이 0.2초일때나 0.4일때나 물체는 똑같은 거리를 이동하게 됩니다.

반면에, `fixedStep`이 `true`라면 경과 시간과 지정 시간에 관계없이 무조건 update되며 이때 경과 시간과 비례한 값으로 물체가 이동하게 됩니다.
예를 들어, 속도 변수가 10이고 경과 시간이 0.1초 라면 물체는 1만큼 움직일 것이고 경과 시간이 0.2초라면 2만큼 이동할 것입니다.

그럼 이번엔 PixiJS의 소스 코드를 보겠습니다.

<details>
  <summary><b>PhaserJS의 소스코드</b></summary>

  ```js
     public update(currentTime: number = performance.now()): void
    {
        let elapsedMS;

        // _requestIfNeeded의 실행에 따라 이전 프레임이 다음 프레임보다 늦게 실행될 수 있는데,
        // PixiJS는 애니메이션 최적화를 위해 이를 분기처리 합니다.
        if (currentTime > this.lastTime)
        {

            elapsedMS = this.elapsedMS = currentTime - this.lastTime;

            // 경과 시간이 최대 시간보다 크다면 최대 시간을 경과 시간에 할당합니다.
            if (elapsedMS > this._maxElapsedMS)
            {
                elapsedMS = this._maxElapsedMS;
            }

            elapsedMS *= this.speed;

            if (this._minElapsedMS)
            {
                const delta = currentTime - this._lastFrame | 0;

                // 경과 시간이 최소 시간보다 작다면 함수를 종료합니다.
                if (delta < this._minElapsedMS)
                {
                    return;
                }

                this._lastFrame = currentTime - (delta % this._minElapsedMS);
            }

            this.deltaMS = elapsedMS;
            this.deltaTime = this.deltaMS * Ticker.targetFPMS;

            const head = this._head;

            let listener = head.next;

            //  연결 리스트로 구현된 event를 실행시킵니다.
            while (listener)
            {
                listener = listener.emit(this);
            }

            if (!head.next)
            {
                this._cancelIfNeeded();
            }
        }
        else
        {
            this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        }

        this.lastTime = currentTime;
    }
  ```

</details>

PixiJS는 최대와 최소 경과 시간을 적극 활용해서 델타 타임 애니메이션을 적용하고 있습니다. 최대와 최소는 조금 다른 역할을 합니다.
만약 경과 시간이 최소 시작보다 작다면 함수를 종료시키지만 만약 최대 시간보다 크다면 경과 시간을 최대 시간으로 할당합니다.
이게 무슨 말이냐 하면 게임 물체가 한번에 이동할 수 있는 최소와 최대 거리를 설정했다는 의미입니다.

PhaserJS와 PixiJS의 델타 타임 애니메이션 구현은 기본적을 동일하다고 볼 수 있습니다.
그러나, update 함수 자체는 조금 다른 역할을 하고 있습니다.
PixiJS의 update 함수는 렌더링과 비주얼 업데이트를 update 함수에서 다루지만 PhaserJS는 충돌 계산 등 게임 전체적인 로직을 함수 내에서 관리하고 있습니다.

이 중 투인앤비는 델타 타임으로 애니메이션뿐만 아니라 충돌 로직까지 모두 다루는 방식을 택했습니다.
그 이유로는 렌더링과 비주얼 업데이트가 이뤄지지 않으면 충돌 로직도 계산될 필요가 없다고 생각했습니다.
왜냐하면 충돌 로직 연산의 비용이 적지 않은데다 물체의 위치가 변경되지 않으면 연산 자체도 필요 없기 때문입니다.

결과적으로 델타 타임 애니메이션을 투인앤비에 적용함으로서 모니터 주파수 문제 해결 물론 잠재적으로 발생할 수 있는 성능에 따른 프레임 저하 문제도 사전에 차단할 수 있었습니다.

> 투인앤비 움직임 속도 로직 변화
> </br>
> rFA(일반) ⇒ setInterval ⇒ rFA(delta time)

</br>


<div align="center">

**동일해진 전투기의 속도**

<img width=500 alt="boss scene" src="https://github.com/sht02048/ToInAndB/assets/131152690/40e5a28c-595c-49df-9d6f-f0c708b4a2a3"/>

</div>

</br>


# 배운 것 그리고 개선할 점

### 처음 적용할 수록 돌아가자

투인앤비에서 OOP를 적용하면서 배운 것은 익숙지 않을 수록 이해하고 증명하는 단계를 밟자 입니다. 핵심 기능을 3 주 안에 구현해야겠다는 생각에 조급한 마음으로 OOP를 공부하고 적용했던 것 같습니다. 그레서 타입스크립트로 마이그레이션하기 위해 코드를 하나하나 세심히 읽어보면 OOP 원칙에 위배되는 상황을 심심치 않게 발견할 수 있었습니다. 이 경험을 발판 삼아 다음 기회에는 더 철저하게 조사하고 이해하고 고민하며 증명하는 시간을 가지려고 합니다.

### 무조건 옳은 것은 없다, 다만 상황에 알맞은 것만 있을 뿐이다.

*애니메이션에는 `rFA`가 무조건 맞지!* 혹은 *OOP의 꽃은 상속을 통한 코드 재사용이지!* 라고 생각하며 적용했던 그때가 참 아쉽습니다. `rFA`와 `setInterval` 등 애니메이션을 구현할 수 있는 방법의 장단점 및 특징을 정리하고 투인앤비의 상황에 맞는 메서드를 합리적으로 채택했다면, 또 상속과 구성을 비교하며 장점과 단점을 파악해서 적용했다면 먼 길을 되돌아오지 않았을 것 같습니다. 무조건적으로 옳거나 틀렸다고 생각하는 것이 아닌 상황을 종합적으로 고려해야 최선의 방법을 찾을 수 있다는 것을 배웠습니다.

### 이런 이유로 라이브러리를 사용하는 구나

모니터 주파수 문제를 해결하기 위한 조사의 종착지는 다른 라이브러리의 작동 원리를 파보는 것이었습니다. 소스 코드를 읽어가며 찾은 결과, 내부적으로 **PhaserJS**와 **PixiJS**의 주파수 해결 방안이 동일하다는 것을 파악할 수 있었고 델타 타임 기법을 투인앤비에 적용해서 문제를 해결할 수 있었습니다. 바닐라 자바스크립트를 사용해서 발생한 문제를 라이브러리는 이미 인지하고 있었고 사전에 해결해 두었습니다.

바닐라 자바스크립트를 사용하면서 라이브러리란 개발 환경에서 마주할 챌린지를 이미 **해결해놓은 지름길**과 같다는 것을 느꼈습니다. 즉, 라이브러리를 사용하면 기술적 챌린지가 감소하고 개발 경험(DX)의 질이 매우 높아진다는 것입니다. 그러나, 과도한 라이브러리 사용은 의존성 문제나 커스텀화 어려움을 야기할 수 있습니다. 따라서 필요할 때만 신중하게 라이브러리를 선택하는 것이 중요합니다. 이번 경험을 통해 라이브러리를 향한 시야를 넓힐 수 있었고, 앞으로 더 현명하게 선택할 수 있을 것입니다.

### 무에서 유를 창조하는 경험

투인앤비를 만들면서 가장 크게 느낀 점은 "개발은 재밌다"입니다. 두 가지 이유가 있습니다. 첫 번째는 무에서 유를 창조하는, 저의 흔적을 남기는 설렘이 개발에 있습니다. 두 번째는 코드가 끊임없이 개선된다는 점입니다. 처음 제작할 당시와 지금 완성된 코드만 비교 해봐도 구조가 완전히 달라졌고 그로 인해 유지 보수성과 가독성이 향상되었습니다. 앞으로 리펙토링 및 타입 스크립트로 마이그레이션하면서 얼마나 더 효율적인 코드를 쓸 수 있을지 기대됩니다.

현재 투인앤비는 총 5개의 스테이지로 이루어져 있으며 하나의 보스전만이 있습니다. 이후 스테이지를 더 확장할 계획은 없지만 지속적인 유지 보수를 통해 렌더링 및 로딩 최적화를 진행할 예정입니다. 만약 추가될 게임 스테이지에 관해 아이디어가 있다면 자유롭게 연락바랍니다.

contact: [sht02048@gmail.com](sht02048@gmail.com)
