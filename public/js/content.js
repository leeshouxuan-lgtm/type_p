// 연습 콘텐츠 관리 모듈
const Content = (() => {

    // Firestore에서 콘텐츠 불러오기
    async function load(docId) {
        const snap = await db.collection('content').doc(docId).get();
        if (!snap.exists) return [];
        return snap.data().items || [];
    }

    // 콘텐츠 저장 (관리자 전용)
    async function save(docId, items) {
        await db.collection('content').doc(docId).set({
            items,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    // 랜덤 항목 n개 반환
    function getRandom(items, n = 1) {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    }

    // 기본 콘텐츠 초기화 (최초 배포 시 Firestore에 없으면 사용)
    const defaults = {
        words_ko: {
            items: [
                '사과', '바나나', '컴퓨터', '키보드', '마우스', '모니터', '프린터', '스캐너',
                '노트북', '스마트폰', '태블릿', '인터넷', '소프트웨어', '하드웨어', '프로그램',
                '데이터', '파일', '폴더', '바탕화면', '저장', '복사', '붙여넣기', '삭제', '실행',
                '학교', '교실', '선생님', '학생', '공부', '숙제', '시험', '점수', '성적', '졸업',
                '봄', '여름', '가을', '겨울', '눈', '비', '바람', '구름', '하늘', '태양', '달', '별',
                '강아지', '고양이', '토끼', '사자', '호랑이', '코끼리', '기린', '원숭이', '펭귄', '독수리',
                '밥', '국', '김치', '불고기', '비빔밥', '냉면', '삼겹살', '된장찌개', '순두부', '갈비',
                '기차', '버스', '택시', '비행기', '자동차', '자전거', '오토바이', '배', '지하철', '트럭'
            ]
        },
        sentences_ko: {
            items: [
                '가는 말이 고와야 오는 말이 곱다.',
                '세 살 버릇 여든까지 간다.',
                '티끌 모아 태산이다.',
                '하늘이 무너져도 솟아날 구멍이 있다.',
                '백지장도 맞들면 낫다.',
                '원숭이도 나무에서 떨어진다.',
                '시작이 반이다.',
                '발 없는 말이 천 리 간다.',
                '콩 심은 데 콩 나고 팥 심은 데 팥 난다.',
                '낮말은 새가 듣고 밤말은 쥐가 듣는다.',
                '고생 끝에 낙이 온다.',
                '빛 좋은 개살구.',
                '호랑이도 제 말 하면 온다.',
                '우물 안 개구리.',
                '돌다리도 두드려 보고 건너라.',
                '금강산도 식후경이다.',
                '가랑비에 옷 젖는 줄 모른다.',
                '아는 것이 힘이다.',
                '연습이 완벽을 만든다.',
                '매일 조금씩 꾸준히 하면 반드시 실력이 늘게 됩니다.'
            ]
        },
        paragraphs_ko: {
            items: [
                '컴퓨터는 현대 사회에서 없어서는 안 될 중요한 도구입니다. 우리는 컴퓨터를 통해 정보를 검색하고, 문서를 작성하며, 다양한 작업을 효율적으로 처리할 수 있습니다. 특히 키보드 입력 속도가 빠를수록 업무 효율이 높아지기 때문에, 타자 연습은 매우 중요한 기초 능력입니다.',
                '봄이 되면 나무에 꽃이 피고 새들이 노래를 합니다. 따뜻한 햇살 아래 공원을 걷다 보면 마음이 상쾌해집니다. 겨울 동안 움츠렸던 몸과 마음을 활짝 펼칠 수 있는 계절, 바로 봄입니다. 이런 봄날에 열심히 공부하는 여러분들이 자랑스럽습니다.',
                '독서는 지식을 쌓는 가장 좋은 방법 중 하나입니다. 책을 통해 우리는 다양한 세계를 경험하고, 새로운 생각을 배울 수 있습니다. 하루에 단 30분이라도 책을 읽는 습관을 기른다면, 시간이 지날수록 그 효과는 놀랍도록 커질 것입니다.',
                '운동은 몸과 마음을 건강하게 유지하는 데 도움이 됩니다. 매일 규칙적으로 운동을 하면 체력이 향상되고 스트레스도 해소됩니다. 걷기, 달리기, 수영 등 자신에게 맞는 운동을 찾아 꾸준히 실천해 보세요. 건강한 몸에 건강한 정신이 깃든다는 말처럼, 운동은 우리 삶을 더욱 풍요롭게 만들어 줍니다.',
                '우리나라는 사계절이 뚜렷한 나라입니다. 봄에는 꽃이 피고, 여름에는 푸른 나무가 무성하며, 가을에는 단풍이 아름답게 물들고, 겨울에는 하얀 눈이 내립니다. 이러한 계절의 변화는 우리에게 다양한 자연의 모습을 보여주고 풍부한 감성을 키워줍니다.'
            ]
        },
        words_en: {
            items: [
                'apple', 'banana', 'computer', 'keyboard', 'mouse', 'monitor', 'printer', 'scanner',
                'laptop', 'smartphone', 'tablet', 'internet', 'software', 'hardware', 'program',
                'data', 'file', 'folder', 'desktop', 'save', 'copy', 'paste', 'delete', 'execute',
                'school', 'classroom', 'teacher', 'student', 'study', 'homework', 'exam', 'score',
                'spring', 'summer', 'autumn', 'winter', 'snow', 'rain', 'wind', 'cloud', 'sky', 'sun',
                'dog', 'cat', 'rabbit', 'lion', 'tiger', 'elephant', 'giraffe', 'monkey', 'penguin', 'eagle',
                'rice', 'soup', 'bread', 'pizza', 'burger', 'noodle', 'salad', 'steak', 'sushi', 'taco',
                'train', 'bus', 'taxi', 'airplane', 'car', 'bicycle', 'motorcycle', 'ship', 'subway', 'truck'
            ]
        },
        sentences_en: {
            items: [
                'Practice makes perfect.',
                'The early bird catches the worm.',
                'Actions speak louder than words.',
                'Every cloud has a silver lining.',
                'Where there is a will, there is a way.',
                'Knowledge is power.',
                'Time is money.',
                'Look before you leap.',
                'Better late than never.',
                'Two heads are better than one.',
                'A journey of a thousand miles begins with a single step.',
                'Don\'t judge a book by its cover.',
                'Slow and steady wins the race.',
                'Honesty is the best policy.',
                'The pen is mightier than the sword.',
                'All that glitters is not gold.',
                'You reap what you sow.',
                'Rome was not built in a day.',
                'No pain, no gain.',
                'Keep up the great work and you will surely improve.'
            ]
        },
        paragraphs_en: {
            items: [
                'Computers have become an essential part of our daily lives. We use them to search for information, write documents, and complete various tasks efficiently. The ability to type quickly and accurately is a fundamental skill in the digital age. Regular typing practice can significantly improve your speed and accuracy over time.',
                'Reading is one of the best ways to expand your knowledge and vocabulary. Through books, we can explore different worlds and learn new ideas. Even spending just thirty minutes a day reading can have a remarkable impact on your intellectual growth. Start with topics you enjoy and gradually challenge yourself with more complex material.',
                'Exercise is crucial for maintaining both physical and mental health. Regular physical activity improves your fitness level and helps reduce stress. Whether it is walking, running, swimming, or playing sports, find an activity that you enjoy and stick with it. A healthy body leads to a healthy mind, making your life more fulfilling.',
                'Nature offers us a beautiful display of changing seasons. In spring, flowers bloom and birds sing. Summer brings warm sunshine and green trees. Autumn paints the leaves in brilliant shades of red and gold. Winter covers the world in a blanket of white snow. Each season has its own unique beauty and teaches us to appreciate the cycle of life.',
                'Technology is advancing at an incredible pace. New inventions and discoveries are changing the way we live, work, and communicate. It is important to stay curious and keep learning in this rapidly changing world. Embrace new technologies while also remembering the timeless values of creativity, collaboration, and critical thinking.'
            ]
        },

        // ── 자리연습: 한글 키보드 위치 드릴 ──
        keyboard_ko: {
            items: [
                // 기본 모음 자리 (ㅏㅓㅗㅜ 키 위치)
                '아아아 어어어 오오오 우우우 으으으 이이이',
                '아어오 우으이 아어오 우으이 아어오 우으이',
                // 기본 자음 자리 (ㅇㄴㄷ 행 중심)
                '나나나 다다다 아아아 라라라 마마마',
                '사사사 아아아 나나나 하하하 가가가',
                // 홈 행 조합 (ㅏ+자음)
                '가나다 라마바 사아자 차카타 파하',
                '나다라 마바사 아자차 카타파 하가',
                // 받침 없는 낱말 드릴
                '아버지 어머니 오빠 누나 동생 가족 나라 도시 마을 가로',
                '바나나 파파야 코코아 카메라 피아노 소파 드라마 오페라',
                // 숫자 행 + 특수키
                '1111 2222 3333 4444 5555 6666 7777 8888 9999 0000',
                // 윗 자음 행 (ㅂㅈㄷㄱㅅ)
                '바자다 가사 바자다 가사 바자다 가사바',
                // 아랫 자음 행 (ㅋㅌㅊㅍ)
                '카타차 파카타 차파카 타차파 카타차파',
                // 쌍자음 드릴
                '까나 따다 빠바 싸사 짜자 까따빠 싸짜까',
                // 받침 포함 기본 드릴
                '한글 연습 타자 키보드 자리 손가락 연습',
                '컴퓨터 스크린 키보드 마우스 모니터 프린터 스캐너',
                // 기본 문장 드릴
                '나는 학생입니다. 우리는 공부합니다. 타자를 연습합니다.',
            ]
        },

        // ── 자리연습: 영문 키보드 위치 드릴 ──
        keyboard_en: {
            items: [
                // 홈 행 (asdf hjkl)
                'aaa sss ddd fff ggg hhh jjj kkk lll',
                'asdf jkl; asdf jkl; asdf jkl; asdf jkl;',
                'fjfj dkdk slsl a;a; fjdk sla; fjdksla;',
                'add all fall glad hall hall lads flag sad',
                // 윗 행 (qwer uiop)
                'qqq www eee rrr ttt yyy uuu iii ooo ppp',
                'qwer tyui op qwer tyui op qwer tyuiop',
                'quit with your power tower quiet write true',
                'type rope wire poor trip rope quit peer tier',
                // 아랫 행 (zxcv bnm)
                'zzz xxx ccc vvv bbb nnn mmm',
                'zxcv bnm zxcv bnm zxcv bnm zxcv bnm',
                'zinc exam cave bank name move zinc exam cave',
                // 전체 알파벳 드릴
                'the quick brown fox jumps over the lazy dog',
                'pack my box with five dozen liquor jugs',
                // 숫자 행
                '1111 2222 3333 4444 5555 6666 7777 8888 9999 0000',
                '12 34 56 78 90 123 456 789 1234 5678 9012',
                // 대소문자 혼합
                'Hello World Java Script Python React Node SQL',
            ]
        }
    };

    // Firestore에 없으면 기본값 반환
    async function getContent(type) {
        try {
            const items = await load(type);
            if (items.length > 0) return items;
            return defaults[type]?.items || [];
        } catch {
            return defaults[type]?.items || [];
        }
    }

    // 초기 콘텐츠 Firestore에 업로드 (관리자 전용)
    async function initializeDefaults() {
        for (const [key, val] of Object.entries(defaults)) {
            const snap = await db.collection('content').doc(key).get();
            if (!snap.exists) {
                await save(key, val.items);
            }
        }
    }

    return { load, save, getRandom, getContent, initializeDefaults, defaults };
})();
