<script>
    import { onMount } from 'svelte';
    import { axios, handleError } from './axios'
    import KanjiCloud from './kanjicloud.svelte'
    import Form from './form.svelte'

    const INTERVAL = 5000;

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
            if(!timerId) setInterval(getData, INTERVAL)
        } else {
            if(timerId) {
                clearInterval(timerId)
                timerId = null
            }
        }
    }

    onMount(() => {
        getData()
        timerId = setInterval(getData, INTERVAL)
    })
</script>

<KanjiCloud data={data} on:toggleAutoUpdating={toggleAutoUpdating}/>
<h1>現在、漢字の投稿はできません。</h1>
<!-- <Form/> -->