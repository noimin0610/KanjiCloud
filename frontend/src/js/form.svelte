<script>
    import { axios, handleError } from './axios'
    import jQuery from 'jquery'
        
    const MAX_LENGTH = 1;
    const KANJI_PATTERN = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

    let kanji = ''
    let prevKanji = ''
    let errorMessage = ''
    let postMessage = ''

    let kanjiCookie = document.cookie
        .split(';')
        .find(row => row.startsWith('kanji'))
    if (kanjiCookie) {
        prevKanji = kanjiCookie.split('=')[1]
        kanji = prevKanji
    }

    let validate = () => {
        if (kanji.length === 0) {
            return '入力必須です'
        } else if (!KANJI_PATTERN.test(kanji)) {
            return '漢字を入力してください'
        }
    }

    $: {
        if(kanji || prevKanji) errorMessage = validate()
    }

    let sendKanji = () => {
        errorMessage = validate()
        if (!errorMessage) {
            // ここで漢字の送信 / 更新処理を実行
            axios.post('/', { kanji: kanji, prevKanji: prevKanji })
            .then((res) => {
                postMessage = `漢字「${kanji}」を投稿しました！`;
                document.cookie = `kanji=${kanji};SameSite=strict`
                prevKanji = kanji
            })
            .catch((e) => handleError(e))
        }
    }
</script>

<h1>今年の抱負を漢字一文字で表すと？</h1>
<form
    onsubmit="return false"
    class="form-group {errorMessage ? "has-danger" : (postMessage ? "has-success" : "")}">
<input
    id="kanji"
    class="form-control {errorMessage ? "is-invalid" : (postMessage ? "is-valid" : "")}"
    type="text"
    maxlength="{MAX_LENGTH}"
    placeholder="例: 挑"
    bind:value={kanji}
    on:input={() => { postMessage = ''; validate() }}>
<button
    type="submit"
    class="btn btn-primary ml-3"
    on:click={sendKanji}>
    送信
</button>
{#if errorMessage}
    <div class="feedback invalid-feedback">{errorMessage}</div>
{/if}
{#if postMessage}
    <div class="feedback valid-feedback">{postMessage}</div>
{/if}
</form>