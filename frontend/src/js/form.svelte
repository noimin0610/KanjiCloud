<script>
    import { axios, handleError } from './axios'
        
    const MAX_LENGTH = 1;
    const KANJI_PATTERN = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

    let kanji = ''
    let errorMessage = ''

    let sendKanji = () => {
        if (kanji.length === 0) {
            errorMessage = '入力必須です'
        } else if (!KANJI_PATTERN.test(kanji)) {
            errorMessage = '漢字を入力してください'
        } else {
            // ここで漢字の送信 / 更新処理を実行
            axios.post('/', { kanji: kanji })
            .then((res) => {
                alert(`漢字「${kanji}」を投稿しました！`);
            })
            .error((e) => handleError(e))
        }
    }
</script>

<form onsubmit="return false">
<input
    id="kanji"
    type="text"
    maxlength="{MAX_LENGTH}"
    placeholder="今年の抱負を漢字で表すと?"
    bind:value={kanji}
    on:input={() => errorMessage = ''}>

<button
    type="submit"
    class="btn btn-primary ml-3"
    on:click={sendKanji}>
    送信
</button>
</form>

{#if errorMessage}
    <div class="error">
        {errorMessage}
    </div>
{/if}