<script>
    import * as d3 from 'd3'
    import * as cloud from 'd3-cloud'    
    import { axios, handleError } from './axios'
    import jQuery from 'jquery'
    import 'bootstrap/js/dist/tooltip'
    import { createEventDispatcher, onMount } from 'svelte'

    const h = 400
    const w = 1200
    const countMax = 100
    const textSizeMin = 30
    const textSizeMax = 100
    const dispatch = createEventDispatcher()

    export let title = "皆さんの漢字"
    export let data = []
    export let interval = 10000

    let checked = "checked"
    let count = 0

    let get_count = () => {
        axios.get('/count')
        .then((res) => {
            count = res.data.count
        })
        .catch((e) => { handleError(e) })
    }

    get_count()

    let dispatchCheck = () => {
        dispatch('toggleAutoUpdating', { autoUpdating: checked })
    }

    $: {
        let sizeScale = d3.scaleLog([1, countMax]).range([textSizeMin, textSizeMax])
        let words = data.map((val) => {
            return {
                text: val.kanji
                ,count: val.count
                ,size: sizeScale(val.count)
                ,x_db: val.x
                ,y_db: val.y
                ,id: val.id
            }
        })
        cloud()
            .size([w, h])
            .words(words)
            .font("Impact")
            .fontSize((d) => { return d.size })
            .on("end", draw) //描画関数の読み込み
            .start()

        get_count()
    }

    // wordcloud 描画
    function draw(words) {
        d3.select("svg").remove()
        d3.select(".tooltip").remove()

        let kanji = d3.select("#kanjicloud")
            .append("svg")
            .attr("width", w + "px")
            .attr("height", h + "px")
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .attr("class", "kanji")
            .style("font-size", (d) => { return d.size + "px" })
            .style("font-family", '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif')
            .style("fill", (d) => { return d3.schemeCategory10[d.id % 10] })
            .attr("text-anchor", "middle")
            .attr("transform", (d) => {
                return "translate(" + [d.y_db, d.x_db] + ")"
            })
            .attr("count", (d) => d.count)
            .attr("data-toggle", "tooltip")
            .attr("title", (d) => `${d.text}: ${d.count}人` )
            .text((d) => { return d.text })
        
        jQuery('[data-toggle="tooltip"]').tooltip();
    }
</script>

<h1>{title}</h1>
<div id="kanjicloud">
    <div id="kanjicloud-header">
        <p>現在の投稿人数: {count}人</p>
        <input type="checkbox" id="auto-updating" bind:checked="{checked}" on:change={dispatchCheck}/>自動更新する ({interval/1000}秒おき)
    </div>
</div>