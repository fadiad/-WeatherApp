class View {
    render(playersArr) {
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        let newHtml = template({ players: playersArr })
        $('#results').empty().prepend(newHtml)
    }
}