# 🐹 WITTY

<br>

#### 트위터와 인스타그램을 오마주하여 진행한 SNS 프로젝트입니다.

#### [🐹 WITTY BACKEND GitHub repo](https://github.com/JJieunn/Witty)

<br>

---

<br>

## 📆 프로젝트 기간

#### 2022.11.01 ~ 2023.01.27

<br>
<br>

## ⚙️ 파일 구조 및 사용 기술

<img src="https://img.shields.io/badge/Vite-646CFF??style=flat&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/React.js-61DAFB??style=flat&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6??style=flat&logo=typescript&logoColor=white"/>

<details> 
<summary>파일 구조</summary>

```
├── 📄 .env
├── 📄 .gitignore
├── 📄 README.md
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📂 public
│   ├── 🏞️ hamster.png
│   └── 🏞️ kakao_login_logo.png
├── 📂 src
│   ├── 📄 Router.tsx
│   ├── 📂 api
│   ├── 📂 components
│   ├── 📄 main.tsx
│   ├── 📂 pages
│   ├── 📂 styles
│   ├── 📂 utils
│   └── 📄 vite-env.d.ts
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
└── 📄 vite.config.ts
```

</details>

<br/>
<br/>

## ⚙️ 프로젝트 실행 방법

<details>
<summary>순서대로 따라하기</summary>

1. 프로젝트를 클론 받습니다.

```
git clone https://github.com/2021bong/witty.git
```

<br/>

2. 클론 받은 프로젝트 폴더로 들어가 디펜던시 패키지를 설치합니다.

```
cd witty

npm i
```

<br/>

2 - 1. .env 파일을 준비합니다.

```
(.env)

VITE_KAKAO_JAVASCRIPT_KEY = 카카오 JS키
VITE_KAKAO_REDIRECT_URL = http://localhost:5173/loading

VITE_CLOUDINARY_API_KEY = CLOUDINARY API 키
VITE_CLOUDINARY_API_SECRET = CLOUDINARY API SECRET
VITE_CLOUDINARY_PRESET_KEY = CLOUDINARY PRESET 키
VITE_CLOUDINARY_UPLOAD_URL = CLOUDINARY 업로드 URL
```

<br/>

3. 프로젝트를 실행합니다.

```
npm run dev
```

<br/>

4. 해당 주소에서 프로젝트를 확인할 수 있습니다.

```
http://localhost:5173/
```

</details>

<br/>
<br/>

---

<br/>
<br/>

## 🖥️ 구현 화면

<br/>

### 로그인

##### Witty는 로그인 후 이용할 수 있습니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Login](https://user-images.githubusercontent.com/49029756/224647216-6cfe84a6-4fc7-4d85-8d19-af038f9a0d2f.png)

</div>

<br/>
<br/>

### 회원가입

##### 이메일을 사용해 회원가입 할 수 있습니다. 카카오톡 로그인도 가능합니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Sign up](https://user-images.githubusercontent.com/49029756/224647220-22c571cc-4dbb-4037-a49c-aab1f748f309.png)

</div>

<br/>
<br/>

### 메인

##### 최신순으로 올라온 포스트를 확인할 수 있습니다. 좋아요를 누르거나 북마크 저장도 가능합니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Main](https://user-images.githubusercontent.com/49029756/224647234-deb42616-d40e-454a-bd19-076dfa51b21b.png)

</div>

<br/>
<br/>

### 포스트 디테일

##### 댓글을 달고 좋아요를 누를 수 있습니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Detail](https://user-images.githubusercontent.com/49029756/224647231-09fe74d1-76d7-4e95-9a4b-7da180298858.png)

</div>

<br/>
<br/>

### 포스트 작성

##### 포스트를 작성 할 수 있습니다. 최대 4장까지 사진을 첨부할 수 있습니다. 첨부된 사진은 외부 클라우드에 저장됩니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Write](https://user-images.githubusercontent.com/49029756/224647227-d85ef4d9-e9de-40ab-8877-080e2640d4f9.png)

</div>

<br/>
<br/>

### 검색

##### 게시글, 카테고리, 유저로 나눠 검색이 가능합니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Search](https://user-images.githubusercontent.com/49029756/224647210-e05c117b-2b1b-4a73-a676-331fc3a7e3a0.png)

</div>

<br/>
<br/>

### 마이 페이지

##### 내 정보를 확인하고 수정할 수 있습니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty My page](https://user-images.githubusercontent.com/49029756/224647224-ef34eead-e5c4-4f52-925f-ac60cd2f67ac.png)

</div>

<br/>
<br/>

### 채팅

##### 채팅은 추후 구현 예정입니다.

<div style='width : 400px; margin-top: 10px;'>

![Witty Chat](https://user-images.githubusercontent.com/49029756/224647226-639f7fd4-09d4-49e0-8746-7992e954ee2b.png)

</div>
<br>

---

<br>

## 🚧 업데이트 예정

#### 현재 정확한 날짜는 정하지 않았으나 추후 업데이트 예정입니다.

##### - 서버 배포 후 배포 예정

##### - 리팩토링

##### - 채팅 기능

##### - 유저 아이콘 설정

##### - 검색 기능 수정

##### - 디자인 변경
