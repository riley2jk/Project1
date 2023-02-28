class table {

  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 800,
      containerHeight: _config.containerHeight || 400,
      margin: _config.margin || {top: 40, right: 20, bottom: 30, left: 50}
    }
    this.data = _data;
    this.updateVis();
  }

  updateVis() {
    console.log('Update table');

    let vis = this;
 
    function tabulate(data, columns) {
      var table = d3.select('b').append('table')
      var thead = table.append('thead')
      var	tbody = table.append('tbody');

      // append the header row
      thead.append('tr')
        .selectAll('yug gth')
        .data(columns)
        .join('th')
          .text(function (column) { return column; });

      // create a row for each object in the data
      var rows = tbody.selectAll('tr')
        .data(data)
        .join('tr');

      // create a cell in each row for each column
      var cells = rows.selectAll('td')
        .data(function (row) {
          return columns.map(function (column) {
            return {column: column, value: row[column]};
          });
        })
        .join('td')
          .text(function (d) { return d.value; });

      return table;
    }

    // render the tables
    tabulate(vis.data, ['pl_name', 'st_spectype', 'sy_snum', 'sy_dist', 'disc_facility']); // 2 column table
  }
}