
## Getting Start
1. 서버를 먼저 실행합니다. [Server Repository](https://github.com/DevWhkang/todolist-server) (서버 실행 방법은 Server Repository에 README.md에 있습니다.)
2. 프로젝트를 클론합니다. `git clone git@github.com:DevWhkang/todolist-client.git`
3. 터미널에서 해당 프로젝트 폴더로 이동합니다. -> 의존성 패키지 설치를 위해 `npm install` 명령어를 실행합니다.
4. 프로젝트 루트 폴더에서 `npm run start` 명령어를 실행합니다.
5. 브라우저를 열고 `http://localhost:3000`에 접속합니다.

## Usage

### Screenshot
![스크린샷 2021-08-06 오후 11 15 15](https://user-images.githubusercontent.com/56540563/128523828-3632a0f1-343e-4a28-a821-cc37c427fc8a.png)

![스크린샷 2021-08-07 오전 12 05 40](https://user-images.githubusercontent.com/56540563/128531464-5fd1e7f1-20d2-487e-a8a7-697be9ebe28d.png)

### 1. Todo 필터 및 검색
- 탭은 3가지로 구성되어 있습니다. 모든 Todo, 미완료 Todo, 완료 Todo 각 탭을 클릭하면 탭 이름에 맞게 필터링 됩니다.
- 검색창에 키워드를 입력하여 Todo를 검색할 수 있습니다.
- 검색시 선택된 탭에서 검색됩니다.

### 2. Todo 생성
- 우측 상단 플러스 버튼 클릭 -> Todo Text 작성 및 Refence Todo ID를 선택 후 생성 버튼을 누르면 Todo가 생성됩니다. (최초 Todo는 Reference 목록이 없음)

### 3. Todo 삭제
- Todo 목록에서 각 Todo 가장 우측에 휴지통 아이콘이 있습니다. 클릭시 삭제 여부를 확인합니다.

### 4. Todo 수정
- Todo 목록에서 각 Todo 우측 휴지통 아이콘 왼쪽에 연필 아이콘이 있습니다. 클릭시 Todo 생성시와 유사한 Todo 편집이 활성화 됩니다.

### 5. Todo 완료 및 미완료
- Todo 목록에서 각 Todo 가장 왼쪽에 체크박스가 있습니다. 체크박스 체크시 해당 Todo Text가 최소선이 그어지며 완료됩니다. 
- 반대로 완료된 Todo를 다시 미완료 할 수 있습니다.

- 체크박스 비활성화:
  - 어떤 Todo가 참조하는 Reference Todo들 중에서 완료되지 않은 Todo가 있으면 해당 Todo는 완료 할 수 없습니다. 이때 체크박스 비활성화 됩니다.
    즉, 참조하고 있는 Reference Todo가 모두 완료 되어야 해당 Todo를 완료할 수 있습니다.
