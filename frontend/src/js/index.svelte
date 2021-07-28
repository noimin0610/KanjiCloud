<script>
    import { onMount } from 'svelte';
    import { axios, handleError } from './axios'
    import KanjiCloud from './kanjicloud.svelte'
    import Form from './form.svelte'

    const interval = 10000;

    let texts = {}
    let getTexts = () => {
        axios.get('/texts')
            .then((res) => {
                texts = res.data.texts
                document.title = texts.title
            })
            .catch((e) => handleError(e))
    }

    let data = []
    let getData = () => {
        axios.get('/')
            .then((res) => {
                data = res.data.data
            })
            .catch((e) => handleError(e))
    }

    let timerId = null
    let toggleAutoUpdating = (d) => {
        if(d.detail.autoUpdating) {
            if(!timerId) setInterval(getData, interval)
        } else {
            if(timerId) {
                clearInterval(timerId)
                timerId = null
            }
        }
    }

    let update = () => {
        getTexts()
        getData()
    }

    onMount(() => {
        update()
        timerId = setInterval(update, interval)
    })
</script>

<KanjiCloud title={texts.kanjicloud_title} data={data} interval={interval} on:toggleAutoUpdating={toggleAutoUpdating}/>
<Form title={texts.form_title} />