<script>
    import { onMount } from 'svelte';
    import { axios, handleError } from './axios'
    import KanjiCloud from './kanjicloud.svelte'
    import Form from './form.svelte'

    const interval = 10000;

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

    onMount(() => {
        getData()
        timerId = setInterval(getData, interval)
    })
</script>

<KanjiCloud data={data} interval={interval} on:toggleAutoUpdating={toggleAutoUpdating}/>
<Form/>