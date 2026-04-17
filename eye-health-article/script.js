/* ========== 关注按钮 ========== */
function toggleFollow(btn) {
    if (btn.classList.contains('followed')) {
        btn.classList.remove('followed');
        btn.textContent = '+ 关注';
    } else {
        btn.classList.add('followed');
        btn.textContent = '已关注';
        showToast('感谢关注，护眼路上与您同行 ❤');
    }
}

/* ========== Toast ========== */
function showToast(msg, dur) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => t.classList.remove('show'), dur || 2000);
}

/* ========== 数字滚动动画 ========== */
function animateNumbers() {
    const nums = document.querySelectorAll('.stat-num');
    nums.forEach(el => {
        const target = +el.dataset.target;
        const duration = 1400;
        const start = performance.now();
        function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const easeOut = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * easeOut);
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
}

const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            animateNumbers();
            obs.disconnect();
        }
    });
}, { threshold: 0.4 });

const firstStat = document.querySelector('.stat-grid');
if (firstStat) statObserver.observe(firstStat);

/* ========== 视力表 ========== */
(function buildEyechart() {
    const wrap = document.getElementById('eyechart');
    if (!wrap) return;

    // 每行 1 个 E，尺寸递减；实际大视标在上
    const rows = [
        { size: 70, dir: randDir(), label: '0.1' },
        { size: 52, dir: randDir(), label: '0.3' },
        { size: 38, dir: randDir(), label: '0.5' },
        { size: 28, dir: randDir(), label: '0.8' },
        { size: 20, dir: randDir(), label: '1.0' },
        { size: 14, dir: randDir(), label: '1.5' }
    ];

    const dirs = ['↑','↓','←','→'];

    rows.forEach((r, idx) => {
        const row = document.createElement('div');
        row.className = 'eye-row-wrap';

        const lbl = document.createElement('span');
        lbl.className = 'eye-row-label';
        lbl.textContent = r.label;
        row.appendChild(lbl);

        const inner = document.createElement('div');
        inner.className = 'eye-row';

        // 每行放 3 个不同方向的 E，选一个是正确方向
        const rowDirs = [randDir(), randDir(), randDir()];
        rowDirs.forEach((d) => {
            const e = document.createElement('span');
            e.className = 'eye-e';
            e.textContent = dirs[d];
            e.style.fontSize = r.size + 'px';
            e.addEventListener('click', () => handleClick(idx, r.label, e));
            inner.appendChild(e);
        });

        row.appendChild(inner);
        wrap.appendChild(row);
    });

    function randDir() { return Math.floor(Math.random() * 4); }

    function handleClick(idx, label, el) {
        wrap.querySelectorAll('.eye-e').forEach(x => x.classList.remove('clicked'));
        el.classList.add('clicked');

        const out = document.getElementById('eyechartResult');
        out.className = 'eyechart-result';

        let msg, cls;
        const v = parseFloat(label);
        if (v >= 1.0) {
            msg = `👍 太棒了！你看清了 ${label} 视标，视力良好（此为趣味测试）。仍建议每年做一次专业检查。`;
            cls = 'good';
        } else if (v >= 0.5) {
            msg = `⚠️ 仅看清 ${label} 视标，可能存在轻中度近视/远视，建议到院验光确认。`;
            cls = 'normal';
        } else {
            msg = `🚨 只看清 ${label}，视力可能异常，请尽快到医院散瞳验光。`;
            cls = 'warn';
        }
        out.textContent = msg;
        out.classList.add(cls);
    }
})();

/* ========== 眼球解剖信息 ========== */
const anatomyData = {
    cornea : {
        title : '👁 角膜 Cornea',
        body  : '眼球最前端透明的"窗户"，占眼球总屈光力约70%。受损会明显影响视力，严重时需角膜移植。'
    },
    iris : {
        title : '🎨 虹膜 Iris',
        body  : '决定眼睛颜色的"光圈"，可自动调节瞳孔大小控制进光量。'
    },
    lens : {
        title : '🔍 晶状体 Lens',
        body  : '天然的"自动对焦镜头"。随年龄硬化会出现老花，混浊则是白内障。'
    },
    retina : {
        title : '🎬 视网膜 Retina',
        body  : '眼底的"感光底片"，接收光信号转为神经电信号。高度近视者易发生视网膜脱离。'
    },
    nerve : {
        title : '🧠 视神经 Optic Nerve',
        body  : '把视觉信号传入大脑的"光缆"。青光眼会不可逆地损伤视神经。'
    },
    sclera : {
        title : '🛡️ 巩膜 Sclera',
        body  : '眼球白色的坚韧外壳，保护和维持眼球形状。'
    }
};

document.querySelectorAll('.anatomy .part').forEach(el => {
    const handler = () => {
        const key = el.dataset.info;
        if (!key) return;
        document.querySelectorAll('.anatomy .part').forEach(p => p.classList.remove('active'));
        el.classList.add('active');
        const info = document.getElementById('anatomyInfo');
        info.innerHTML = `<div class="info-title">${anatomyData[key].title}</div>
                          <div class="info-body">${anatomyData[key].body}</div>`;
    };
    el.addEventListener('click', handler);
    el.addEventListener('mouseenter', handler);
});

/* ========== Quiz ========== */
const quizData = [
    {
        q: '你每天使用电子屏幕（手机+电脑）的总时长是？',
        opts: [
            { t: '不到2小时',  s: 20 },
            { t: '2-4小时',    s: 15 },
            { t: '4-8小时',    s: 8  },
            { t: '8小时以上',  s: 2  }
        ]
    },
    {
        q: '用眼期间，你会主动休息/远眺吗？',
        opts: [
            { t: '每20-30分钟就休息一次', s: 20 },
            { t: '偶尔会休息',             s: 12 },
            { t: '很少主动休息',           s: 5  },
            { t: '从不休息',               s: 1  }
        ]
    },
    {
        q: '每天户外活动时间大约有多久？',
        opts: [
            { t: '≥2小时',  s: 20 },
            { t: '1-2小时', s: 14 },
            { t: '0.5-1小时', s: 8 },
            { t: '几乎没有',  s: 2 }
        ]
    },
    {
        q: '你多久做一次眼健康检查？',
        opts: [
            { t: '每年一次',  s: 20 },
            { t: '两年一次',  s: 12 },
            { t: '只在配镜时', s: 6 },
            { t: '从未检查',   s: 1 }
        ]
    },
    {
        q: '晚上睡前你会在关灯后玩手机吗？',
        opts: [
            { t: '从不',       s: 20 },
            { t: '偶尔',       s: 12 },
            { t: '经常',       s: 5  },
            { t: '每天都看到很晚', s: 1 }
        ]
    }
];

let quizIndex = 0;
let quizScore = 0;
let quizSelected = null;

function renderQuiz() {
    const body = document.getElementById('quizBody');
    const bar  = document.getElementById('quizBar');
    if (!body) return;

    bar.style.width = ((quizIndex) / quizData.length * 100) + '%';

    if (quizIndex >= quizData.length) {
        bar.style.width = '100%';
        renderQuizResult();
        return;
    }

    const q = quizData[quizIndex];
    let html = `<div class="quiz-index">第 ${quizIndex + 1} / ${quizData.length} 题</div>
                <div class="quiz-question">${q.q}</div>`;
    q.opts.forEach((o, i) => {
        html += `<label class="quiz-option" data-i="${i}">
                    <input type="radio" name="q" style="display:none" value="${o.s}">
                    ${o.t}
                 </label>`;
    });
    body.innerHTML = html;

    body.querySelectorAll('.quiz-option').forEach(el => {
        el.addEventListener('click', () => {
            body.querySelectorAll('.quiz-option').forEach(x => x.classList.remove('selected'));
            el.classList.add('selected');
            quizSelected = +el.querySelector('input').value;
            setTimeout(() => {
                quizScore += quizSelected;
                quizIndex++;
                quizSelected = null;
                renderQuiz();
            }, 300);
        });
    });
}

function renderQuizResult() {
    const body = document.getElementById('quizBody');
    let level, comment, color;
    if (quizScore >= 85) {
        level = '🏆 护眼达人';
        comment = '你的用眼习惯堪称典范！请继续保持，也把这份好习惯分享给家人朋友。';
        color = '#07c160';
    } else if (quizScore >= 60) {
        level = '👍 良好';
        comment = '整体不错，但仍有提升空间。建议加强户外活动与用眼间歇休息。';
        color = '#4A90E2';
    } else if (quizScore >= 40) {
        level = '⚠️ 一般';
        comment = '你的用眼习惯需要调整了，长期下去视力风险较高。建议预约一次眼健康检查。';
        color = '#f5a623';
    } else {
        level = '🚨 危险';
        comment = '你的用眼习惯已发出预警！强烈建议立即调整生活习惯，并到专业眼科医院做全面检查。';
        color = '#e74c3c';
    }

    body.innerHTML = `
        <div class="quiz-result">
            <div class="score-label">你的护眼指数</div>
            <div class="score">${quizScore}</div>
            <div class="score-level" style="background:${color}22;color:${color}">${level}</div>
            <div class="score-comment">${comment}</div>
            <button class="quiz-restart" onclick="restartQuiz()">再测一次</button>
        </div>
    `;
}

function restartQuiz() {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
}

renderQuiz();

/* ========== 公益二维码 ========== */
function showQR() {
    showToast('请长按下方二维码识别预约 📅', 2500);
    const qr = document.querySelector('.qr-card');
    if (qr) qr.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ========== 点赞/在看 ========== */
function reactClick(btn, type) {
    const key = 'wx-react-' + type;
    const already = localStorage.getItem(key);
    const el = document.getElementById(type + 'Count');
    if (!el) return;
    let n = +el.textContent;
    if (already) {
        btn.classList.remove('active');
        localStorage.removeItem(key);
        el.textContent = n - 1;
    } else {
        btn.classList.add('active');
        localStorage.setItem(key, '1');
        el.textContent = n + 1;
        spawnHeart(btn);
    }
}

function spawnHeart(btn) {
    const rect = btn.getBoundingClientRect();
    const h = document.createElement('div');
    h.textContent = '+1';
    h.style.cssText = `
        position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top}px;
        color:#ff6b6b;font-weight:700;pointer-events:none;z-index:1000;
        transition:all 0.8s ease-out;font-size:16px;
    `;
    document.body.appendChild(h);
    requestAnimationFrame(() => {
        h.style.transform = 'translateY(-40px)';
        h.style.opacity = '0';
    });
    setTimeout(() => h.remove(), 800);
}

function shareClick() {
    if (navigator.share) {
        navigator.share({
            title : document.title,
            text  : '6·6全国爱眼日，把"视界"还给你。',
            url   : location.href
        }).catch(() => {});
    } else {
        navigator.clipboard && navigator.clipboard.writeText(location.href);
        showToast('链接已复制，快分享给朋友 💌');
    }
}

/* ========== 初始化持久化状态 ========== */
(function restoreState() {
    ['like', 'eye'].forEach(type => {
        if (localStorage.getItem('wx-react-' + type)) {
            const btn = document.querySelector(`.react-btn[data-type="${type}"]`);
            const el  = document.getElementById(type + 'Count');
            if (btn && el) {
                btn.classList.add('active');
                el.textContent = +el.textContent + 1;
            }
        }
    });
})();

/* ========== 返回顶部 ========== */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTop.classList.add('show');
    else                       toTop.classList.remove('show');
});
