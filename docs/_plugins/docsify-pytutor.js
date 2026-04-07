(function () {
    const CONFIG = {
        // 公网模式：直接使用 Python Tutor 官方 iframe
        // 如果后面你自部署了 Python Tutor，只要把这里改成你的域名即可
        baseEmbedUrl: 'https://pythontutor.com/iframe-embed.html',

        defaultHeight: 560,
        defaultOptions: {
            cumulative: 'false',
            curInstr: '0',
            heapPrimitives: 'nevernest',
            drawParentPointers: 'false',
            textReferences: 'false',
            showOnlyOutputs: 'false'
        },

        langMap: {
            'pytutor-python': {
                label: 'Python',
                py: '3'
            },
            'pytutor-java': {
                label: 'Java',
                py: 'java'
            }
        }
    };

    function encodeCode(code) {
        return encodeURIComponent((code || '').trim());
    }

    function buildHash(code, langConfig) {
        const params = {
            code: code.trim(),
            py: langConfig.py,
            ...CONFIG.defaultOptions
        };

        // Python Tutor 的 embed 文档使用 hash 参数
        // 这里手工拼装，避免 query/hash 混用
        return Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    }

    function buildIframeUrl(code, langConfig) {
        return `${CONFIG.baseEmbedUrl}#${buildHash(code, langConfig)}`;
    }

    function createToolbar(langLabel, rawCode) {
        const toolbar = document.createElement('div');
        toolbar.className = 'pytutor-toolbar';

        const left = document.createElement('div');
        left.className = 'lang-badge';
        left.textContent = `${langLabel} 可视化`;

        const right = document.createElement('div');
        right.style.display = 'flex';
        right.style.gap = '8px';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = '复制代码';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.border = '1px solid #ddd';
        copyBtn.style.background = '#fff';
        copyBtn.style.borderRadius = '6px';
        copyBtn.style.padding = '4px 10px';
        copyBtn.onclick = async function () {
            try {
                await navigator.clipboard.writeText(rawCode);
                copyBtn.textContent = '已复制';
                setTimeout(() => (copyBtn.textContent = '复制代码'), 1200);
            } catch (e) {
                copyBtn.textContent = '复制失败';
                setTimeout(() => (copyBtn.textContent = '复制代码'), 1200);
            }
        };

        right.appendChild(copyBtn);
        toolbar.appendChild(left);
        toolbar.appendChild(right);

        return toolbar;
    }

    function renderOneBlock(pre, langKey) {
        if (!pre || pre.dataset.ptRendered === '1') return;

        const codeEl = pre.querySelector('code');
        if (!codeEl) return;

        const rawCode = codeEl.textContent || '';
        if (!rawCode.trim()) return;

        const langConfig = CONFIG.langMap[langKey];
        if (!langConfig) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'pytutor-wrapper';

        const toolbar = createToolbar(langConfig.label, rawCode);

        const iframe = document.createElement('iframe');
        iframe.src = buildIframeUrl(rawCode, langConfig);
        iframe.loading = 'lazy';
        iframe.title = `${langConfig.label} Visualizer`;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';

        const note = document.createElement('div');
        note.className = 'pytutor-note';
        // note.textContent = '说明：适合小段教学示例代码。大项目、外部依赖、文件读写、GUI 等通常不适合可视化。';

        const noteWrap = document.createElement('div');
        noteWrap.style.padding = '0 14px 12px';
        noteWrap.appendChild(note);

        wrapper.appendChild(toolbar);
        wrapper.appendChild(iframe);
        wrapper.appendChild(noteWrap);

        pre.replaceWith(wrapper);
        pre.dataset.ptRendered = '1';
    }

    function renderPyTutorBlocks() {
        const container = document.querySelector('#main');
        if (!container) return;

        Object.keys(CONFIG.langMap).forEach((langKey) => {
            const blocks = container.querySelectorAll(`pre[data-lang="${langKey}"]`);
            blocks.forEach((pre) => renderOneBlock(pre, langKey));
        });
    }

    window.renderPyTutorBlocks = renderPyTutorBlocks;
})();