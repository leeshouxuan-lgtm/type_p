// Firebase 설정 및 초기화
const firebaseConfig = {
  apiKey: "AIzaSyCqRavZNTR2Du0zdhWOGFXPnfsad9mn91g",
  authDomain: "typing-practice-8f3f6.firebaseapp.com",
  projectId: "typing-practice-8f3f6",
  storageBucket: "typing-practice-8f3f6.firebasestorage.app",
  messagingSenderId: "12390257127",
  appId: "1:12390257127:web:49611f61026a137389ad42",
  measurementId: "G-7SPS07Q8GJ"
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// 서비스 인스턴스 전역 노출
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// 공용 PC 대비: 세션 지속성을 SESSION으로 설정
// → 브라우저 탭/창을 닫으면 로그인 상태 자동 소멸 (localStorage에 저장 안 함)
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

// 관리자 이메일
const ADMIN_EMAIL = 'yuhoyuha97@gmail.com';
