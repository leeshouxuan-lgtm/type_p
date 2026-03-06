// 프로필 입력 처리 모듈
const Profile = (() => {

    // 학반 옵션 생성 - Firestore settings/site에서 grades, classesPerGrade 읽어옴
    async function generateClassOptions(selectEl) {
        selectEl.innerHTML = '<option value="">학반을 선택하세요</option>';

        let grades = 3;
        let classesPerGrade = 6;

        try {
            const snap = await db.collection('settings').doc('site').get();
            if (snap.exists) {
                const d = snap.data();
                if (d.grades) grades = parseInt(d.grades);
                if (d.classesPerGrade) classesPerGrade = parseInt(d.classesPerGrade);
            }
        } catch (e) {
            console.warn('학반 설정 로드 실패, 기본값 사용:', e);
        }

        for (let grade = 1; grade <= grades; grade++) {
            const group = document.createElement('optgroup');
            group.label = `${grade}학년`;
            for (let cls = 1; cls <= classesPerGrade; cls++) {
                const opt = document.createElement('option');
                opt.value = `${grade}-${cls}`;
                opt.textContent = `${grade}학년 ${cls}반`;
                group.appendChild(opt);
            }
            selectEl.appendChild(group);
        }
    }

    // 프로필 저장
    async function saveProfile(uid, { name, className, email, photoURL }) {
        // 학반에서 학년 추출 (예: "3-2" → 3)
        const grade = parseInt(className.split('-')[0]);

        await db.collection('users').doc(uid).set({
            name,
            className,
            grade,
            email,
            photoURL,
            profileComplete: true,
            level: 1,
            totalExp: 0,
            totalKeystrokes: 0,
            badges: [],
            joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    // 프로필 불러오기
    async function getProfile(uid) {
        const snap = await db.collection('users').doc(uid).get();
        return snap.exists ? snap.data() : null;
    }

    // 프로필 유효성 검사
    function validateName(name) {
        const trimmed = name.trim();
        if (!/^[가-힣]{2,5}$/.test(trimmed)) {
            return '이름은 한글 2~5자로 입력해 주세요.';
        }
        return null;
    }

    return { generateClassOptions, saveProfile, getProfile, validateName };
})();
