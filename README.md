# 노무사 x Claude Code 강의 운영 가이드

## 필수 환경변수
- `ADMIN_SESSION_SECRET`: 관리자 세션 서명 키(필수)
- `ADMIN_PASSWORD`: 관리자 로그인 비밀번호(필수)
- `LESSON_ACCESS_SECRET`: 일일 강의 접근 코드 생성 비밀키(필수)
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob 쓰기 토큰(사용 중인 경우 필수)

## 보안 체크
- 기본 관리자 비밀번호(`0715`)는 삭제했습니다.
- 서버는 HMAC 서명 HttpOnly 쿠키로 관리자 세션과 접근 코드를 관리합니다.
- 비밀값이 없으면 해당 인증은 실패 처리합니다.
- Vercel에서는 플랫폼이 제공하는 `x-vercel-forwarded-for`만 클라이언트 IP로 신뢰합니다.
- 별도 역방향 프록시를 쓰는 경우 프록시가 외부 입력 헤더를 제거하고 실제 IP로 덮어쓰도록 구성한 뒤 `TRUSTED_CLIENT_IP_HEADER`에 그 헤더 이름을 지정하세요.
- 로그인·접근 코드·반응 API의 기본 제한은 프로세스 메모리 기반입니다. 서버리스 인스턴스 재시작·수평 확장 시 버킷이 공유되지 않으므로, 운영에서 전역 제한이 필요하면 Vercel Firewall 또는 외부 KV 기반 제한을 함께 적용해야 합니다.

## 실행
- 설치: `npm install`
- 실행: `npm run dev`
- 검사: `npm run lint`, `npm run tsc`, `npm run test`, `npm run build`, `npm run test:integration`, `npm audit`, `npm audit --omit=dev`
