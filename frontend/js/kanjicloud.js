(() => {
    'use strict';

    const TARGET_ELEMENT_ID = "#kanjicloud";
    const SEND_BUTTON_ID = "#send";

    function draw_cloud() {
        let data = [
                {
                    kanji: "牛"
                    ,count: 15
                    ,x_db: -400
                    ,y_db: -120
                }
                ,{
                    kanji: "豚"
                    ,count: 20
                    ,x_db: -200
                    ,y_db: -40
                }
                ,{
                    kanji: "鳥"
                    ,count: 15
                    ,x_db: 200
                    ,y_db: 40
                }
                ,{
                    kanji: "羊"
                    ,count: 10
                    ,x_db: 400
                    ,y_db: 120
                }
                ,{
                    kanji: "猪"
                    ,count: 10
                    ,x_db: 0
                    ,y_db: 0
                }
            ];

        const h = 400;
        const w = 1200;
        
        const countMax = d3.max(Object.values(data).map((val) => { return val.count; }));
        let sizeScale = d3.scaleLinear().domain([0, countMax]).range([10, 100])

        let words = [];
        Object.keys(data).forEach((key) => {
            words.push({
                text: data[key].kanji
                ,size: sizeScale(data[key].count)
                ,x_db: data[key].x_db
                ,y_db: data[key].y_db
            });
        });

        d3.layout.cloud().size([w, h])
            .words(words)
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw) //描画関数の読み込み
            .start();

        // wordcloud 描画
        function draw(words) {
            console.log(words);
            $(TARGET_ELEMENT_ID + " svg").remove();
            d3.select(TARGET_ELEMENT_ID)
                .append("svg")
                .attr("class", "ui fluid image") // style using semantic ui
                .attr("viewBox", "0 0 " + w + " " + h )  // ViewBox : x, y, width, height
                .attr("width", w + "px")
                .attr("height", h + "px")
                .append("g")
                .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif')
                .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x_db, d.y_db] + ")";
                })
                .text(function(d) { return d.text; });
        }
    }

    draw_cloud();

    $(SEND_BUTTON_ID).on("click", () => {
        ref.push($("#kanji").val());
    });
})();