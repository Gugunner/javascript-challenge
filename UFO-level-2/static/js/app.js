const dataset = data;
const tbody = d3.select("tbody");

const maps = data.reduce((acc, currentVal, idx) => {
    return idx === 1 ?
        {
            dates: [acc.datetime, currentVal.datetime],
            cities: [acc.city, currentVal.city],
            states: [acc.state, currentVal.state],
            countries: [acc.country, currentVal.country],
            shapes: [acc.shape, currentVal.shape]
        } :
        {
            dates: [...acc.dates, currentVal.datetime],
            cities: [...acc.cities, currentVal.city],
            states: [...acc.states, currentVal.state],
            countries: [...acc.countries, currentVal.country],
            shapes: [...acc.shapes, currentVal.shape]
        }
});

const setTable = (dataset) => {
    tbody.html("");
    dataset.forEach(d => {
        const tr = tbody.append("tr");
        Object.keys(d).forEach(k => tr.append("td").text(d[k]))
    });
};

const checkFilterStatus = (data, filter, filterBy) => {
    return filter ? data[filterBy] === filter ? true : false : true;
};

const filterTable = () => {
    d3.event.preventDefault();
    const datetime = d3.select("#dates option:checked").attr("value");
    const city = d3.select("#cities option:checked").attr("value");
    const state = d3.select("#states option:checked").attr("value");
    const country = d3.select("#countries option:checked").attr("value");
    const shape = d3.select("#shapes option:checked").attr("value");
    const newDataset = dataset.filter(d => {
        return checkFilterStatus(d, datetime, "datetime") &&
            checkFilterStatus(d, city, "city") &&
            checkFilterStatus(d, state, "state") &&
            checkFilterStatus(d, country, "country") &&
            checkFilterStatus(d, shape, "shape");
    });
    setTable(newDataset);
};

const cleanFilters = () => {
    const initialOptions = ["date", "city", "state", "country", "shape"];
    Object.keys(maps).forEach((k,idx) =>
        [...new Set(maps[k])].forEach(v => {
            d3.select(`#${k}`).html("");
            d3.select(`#${k}`).append("option").attr("value", "").text(`Select a ${initialOptions[idx]}`);
        })
    );
}

const initFilters = () => {
    Object.keys(maps).forEach(k =>
        [...new Set(maps[k])].forEach(v =>
            d3.select(`#${k}`).append("option").attr("value", v).text(v)
        )
    );
};

setTable(dataset);
initFilters();

d3.select("#filter-btn").on("click", filterTable);

d3.select("#reset-btn").on("click", () => { setTable(dataset); cleanFilters(); initFilters() });