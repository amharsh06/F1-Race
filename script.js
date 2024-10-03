document.getElementById('fetchButton').addEventListener('click', function() {
    const year = document.getElementById('yearInput').value.trim();

    if (!year) {
        alert('Please enter a year.');
        return;
    }

    const apiUrl = `https://ergast.com/api/f1/${year}.json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const races = data.MRData.RaceTable.Races;
            displaySchedule(data.MRData.series, data.MRData.RaceTable.season, races);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch race schedule. Please try again later.');
        });
});

function displaySchedule(series, season, races) {
    const seriesInfo = document.getElementById('seriesInfo');
    const seasonInfo = document.getElementById('seasonInfo');
    const totalResultsInfo = document.getElementById('totalResultsInfo');
    const tableBody = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];

    seriesInfo.textContent = `Series: ${series}`;
    seasonInfo.textContent = `Season: ${season}`;
    totalResultsInfo.textContent = `Total Races: ${races.length}`;

    tableBody.innerHTML = ''; 

    races.forEach(race => {
        const row = tableBody.insertRow();

        const seasonCell = row.insertCell(0);
        const roundCell = row.insertCell(1);
        const raceNameCell = row.insertCell(2);
        const dateCell = row.insertCell(3);
        const timeCell = row.insertCell(4);
        const countryCell = row.insertCell(5);
        const urlCell = row.insertCell(6);

        seasonCell.textContent = race.season;
        roundCell.textContent = race.round;
        raceNameCell.textContent = race.raceName;
        dateCell.textContent = race.date;
        timeCell.textContent = race.time || 'N/A';
        countryCell.textContent = race.Circuit.Location.country;
        urlCell.innerHTML = `<a href="${race.url}" target="_blank">Link</a>`;
    });
}
