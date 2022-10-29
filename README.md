# Project Title

Peaksum 서버 보일러 플레이트 (nestjs, postgresql)

## About The Project

- 유저인증 (JWT)
- 유저 회원가입(이메일, 비밀번호)
- 기본 서버 보일러플레이트
- Contact (작성예시)
- domain : 도메인 설계
- infrastructure : domain과 usecases를 실제 프레임워크, 라이브러리를 사용한 서버로직 구현부
- usecases : 도메인 설계를 바탕으로한 각 usecase 명세

### Built With

- nestjs(express)
- typescript
- typeorm
- postgresql
- passport(인증)
- swagger
- bcrypt(암호화)
- firebase-admin
- swagger

## Getting Started

- /env/local.env - env 환경변수

```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_SCHEMA=
DATABASE_SYNCHRONIZE=

JWT_SECRET=
JWT_EXPIRATION_TIME=
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRATION_TIME=
```

- ecosystem.config.js - pm2 실행전략

### Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
