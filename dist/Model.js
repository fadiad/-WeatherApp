class Cities {

    constructor() {
        this._Cities = []
    }

    async setSavedCities() {
        let cities = await $.get('/cities', function (cities) {
            console.log(cities);
            return cities
        })
        this._Cities = cities.map(e => ({ ...e, saved: true }))
    }

    getCities() {
        return this._Cities
    }

    async getCityByName(cityName) {
        let city = await $.get('/cities/' + cityName)

        if (city) {
            this._Cities.push(city)
        }
    }

    addCity(btnIcon) {

        $.post('/cities', {
            "name": $(btnIcon).siblings('.weather').find('h2')[0].textContent,
            "temperature": $(btnIcon).siblings('.weather').find("h2")[1].textContent.split(' ')[0],
            "condition": $(btnIcon).siblings('.weather').find("h2")[2].textContent,
            "conditionPic": $(btnIcon).siblings('.weather').find("img")[0].src,
        }, function (body, status, res) {
            console.log(res.status);
        })

    }

    deleteCity(btnIcon) {
        $.ajax({
            url: `/cities/${$(btnIcon).siblings('.weather').find('h2')[0].textContent}`,
            type: 'DELETE',
            success: function (status,result) {
                console.log(result);
                console.log(statusCode);
            }
        });

    }
}
