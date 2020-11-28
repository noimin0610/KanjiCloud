(() => {
    'use strict';

    const TARGET_ELEMENT_ID = "#kanjicloud";
    const SEND_BUTTON_ID = "#send";

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDrOs6P4eyotV88Lm9O_uymd5CpdBwMbNY",
        authDomain: "kanjicloud-4f38c.firebaseapp.com",
        databaseURL: "https://kanjicloud-4f38c.firebaseio.com",
        projectId: "kanjicloud-4f38c",
        storageBucket: "kanjicloud-4f38c.appspot.com",
        messagingSenderId: "574859181846",
        appId: "1:574859181846:web:5418c24d02f7ba256f9a37"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    const ref = database.ref("/");

    function draw_cloud(snap) {
        let list = snap.val();
        let data = _.countBy(list);

        const h = 490;
        const w = 600;
        
        var random = d3.randomIrwinHall(2);
        var countMax = d3.max(Object.values(data));
        var sizeScale = d3.scaleLinear().domain([0, countMax]).range([10, 100])

        var words = [];
        Object.keys(data).forEach((key) => {
            words.push({text: key, size: sizeScale(data[key])});
        });

        d3.layout.cloud().size([w, h])
            .words(words)
            .rotate(function() { return (~~(Math.random() * 6) - 3) * 30; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw) //描画関数の読み込み
            .start();

        // wordcloud 描画
        function draw(words) {
            $(TARGET_ELEMENT_ID + " svg").remove();
            d3.select(TARGET_ELEMENT_ID)
                .append("svg")
                .attr("class", "ui fluid image") // style using semantic ui
                .attr("viewBox", "0 0 " + w + " " + h )  // ViewBox : x, y, width, height
                .attr("width", "300px")
                .attr("height", "200px")
                .append("g")
                .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")";
                })
                .text(function(d) { return d.text; });
        }
    }

    let drawed = false;
    ref.get().then((snap) => {
        if(drawed) return;
        draw_cloud(snap);
        drawed = true;
        ref.on("value", draw_cloud);
    });
    

    $(SEND_BUTTON_ID).on("click", () => {
        ref.push($("#kanji").val());
    });
})();