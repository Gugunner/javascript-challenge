const dataset = data;
const tbody = d3.select("tbody");

const setTable = (dataset) => {
    tbody.html("");
    dataset.forEach(d => {
        const tr = tbody.append("tr");
        Object.keys(d).forEach(k => tr.append("td").text(d[k]))
    });
};

const filterTable = (value) => {
    d3.event.preventDefault();
    const newDataset = dataset.filter(d => d["datetime"] === value);
    console.log('New Data set',newDataset);
    setTable(newDataset);
};

d3.select("#filter-btn").on("click", () => {
    const value = d3.select("#datetime").property("value");
     value !== "" ? filterTable(value) : alert("No date found");
});

d3.select("#reset-btn").on("click", () => setTable(dataset));

setTable(dataset);