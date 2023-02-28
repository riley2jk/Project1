let data, radMass, numOfStars, discoveryBar, numOfPlanets, starType, habitBar, discLine, distance, exoTable;
let numStarsFilter = [], numPlanetsFilter = [], habitBarFilter = [], starTypeFilter = [], discoveryBarFilter = [];
let filterArray = [];

d3.csv('data/exoplanets.csv')
  .then(_data => {
		data = _data;
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    //process the data - this is a forEach function.  You could also do a regular for loop.... 
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
  		d.sy_snum = +d.sy_snum; // convert string 'cost' to number
			d.sy_pnum = +d.sy_pnum;
			d.disc_year = +d.disc_year;
			d.pl_orbsmax = +d.pl_orbsmax;
			d.pl_rade = +d.pl_rade;
			d.pl_bmasse = +d.pl_bmasse;
			d.pl_orbeccen = +d.pl_orbeccen;
			d.st_rad = +d.st_rad;
			d.st_mass = +d.st_mass;
			d.sy_dist = +d.sy_dist;
  	});


	// Create an instance (for example in main.js)
	discoveryBar = new DiscoveryType({'parentElement': '#DiscBarChart'}, data);
	discoveryBar.updateVis();

	numOfPlanets = new PlanetNum({'parentElement': '#PlanetNumBarChart'}, data);
	numOfPlanets.updateVis();

	numOfStars = new StarNum({'parentElement': '#StarNumBarChart'}, data);
	numOfStars.updateVis();

	starType = new StarType({'parentElement': '#StarTypeBarChart'}, data);
	starType.updateVis();

	habitBar = new Habitability({'parentElement': '#HabitBarChart'}, data);
	habitBar.updateVis();

	discLine = new DiscLineChart({'parentElement': '#DiscLineChart'}, data);
	discLine.updateVis();

	radMass = new Scatterplot({'parentElement': '#Scatterplot'}, data);
	radMass.updateVis();

	distance = new Histogram({'parentElement': '#Histogram'}, data);
	distance.updateVis();

	exoTable = new table({'parentElement': '#Table'}, data);

	filterData(starTypeFilter, 0);
})

function sortFrequency(a, b) {
	if (a[1] === b[1]) {
			return 0;
	}
	else {
			return (a[1] < b[1]) ? 1 : -1;
	}
}

function sortInd(a, b) {
	if (a[0] === b[0]) {
		return 0;
	}
	else {
			return (a[0] < b[0]) ? -1 : 1;
	}
}

/**
 * Use bar chart as filter and update scatter plot accordingly
 */
function filterData(a, b) {
	filterArray = [discoveryBar, habitBar, numOfPlanets, numOfStars, starType, radMass, distance]; // to add exotable update vis, fix line recreating

	switch (b) {
		case 0:	
			for (let i = 0; i < filterArray.length; i++) {
				if (a.length == 0) {
					filterArray[i].data = data.filter(d => !a.includes(d.st_spectype.charAt(0)));
				} else if (filterArray[i] != starType) {
					filterArray[i].data = data.filter(d => a.includes(d.st_spectype.charAt(0)));
				}
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.sy_pnum));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.sy_snum));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.discoverymethod));
				filterArray[i].updateVis();
			}
			break;
		case 1:
			for (let i = 0; i < filterArray.length; i++) {
				if (a.length == 0) {
					filterArray[i].data = data.filter(d => !a.includes(d.sy_pnum));
				} else if (filterArray[i] != numOfPlanets) {
					filterArray[i].data = data.filter(d => a.includes(d.sy_pnum));
				}
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.st_spectype.charAt(0)));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.sy_snum));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.discoverymethod));
				filterArray[i].updateVis();
			}
			break;
		case 2:
			for (let i = 0; i < filterArray.length; i++) {
				if (a.length == 0) {
					filterArray[i].data = data.filter(d => !a.includes(d.sy_snum));
				} else if (filterArray[i] != numOfStars) {
					filterArray[i].data = data.filter(d => a.includes(d.sy_snum));
				}
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.st_spectype.charAt(0)));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.sy_pnum));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.discoverymethod));
				filterArray[i].updateVis();
			}
			break;
		case 3:
			for (let i = 0; i < filterArray.length; i++) {
				if (a.length == 0) {
					filterArray[i].data = data.filter(d => !a.includes(d.discoverymethod));
				} else if (filterArray[i] != discoveryBar) {
					filterArray[i].data = data.filter(d => a.includes(d.discoverymethod));
				}
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.st_spectype.charAt(0)));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.sy_pnum));
				filterArray[i].data = filterArray[i].data.filter(d => !a.includes(d.sy_snum));
				filterArray[i].updateVis();
			}
			break;
	}
}

// .catch(error => {
//   console.error('Error loading the data');
// });