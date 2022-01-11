
let view = new View()
let model = new Cities()


let runApp = async function () {

    await model.setSavedCities()

    $('#search-btn').on('click', function () {
        searchBtnEventListener()
    })

    await $('#results').on('click', '.icon', function () {
        addBtnEventListener(this)
    })

    addBtnEventListener = async function (btnIcon) {
        if ($(btnIcon).find("i").hasClass('fa-plus')) {
            $(btnIcon).find("i").removeClass('fas fa-plus').addClass('fas fa-minus-circle')
            model.addCity(btnIcon)
        }
        else {
            $(btnIcon).find("i").removeClass('fas fa-minus-circle').addClass('fas fa-plus')
            model.deleteCity(btnIcon)
        }
    }

    searchBtnEventListener = async function () {
        let cityName = $('input').val()
        console.log(cityIsExisted(cityName));
        if (cityName != '' && !cityIsExisted(cityName)) {
            await model.getCityByName(cityName)
            view.render(model.getCities())
        }
        else {
            $('#results p').css('display', 'block')
        }
    }

    cityIsExisted = function (enteredCityName) {
        let cities = model.getCities()
        console.log(cities);
        for (city of cities) {
           
            if (city.name.toLowerCase() === enteredCityName.toLowerCase()) {
                return true
            }
        }
        return false
    }

    view.render(model.getCities())
}
runApp()