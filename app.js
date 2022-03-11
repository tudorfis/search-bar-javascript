const $ = query => document.querySelector( query )

async function getUsers() {
    return await fetch( 'https://jsonplaceholder.typicode.com/users' ).then(res=>res.json())
}

function renderUsers( users ) {
    const searchList = $( '[data-search-list]' )
    
    return users.map( user => {
        const userElement = $('[data-user-template]').content.cloneNode(true).children[0]

        userElement.querySelector('[data-user-name]').textContent = user.name
        userElement.querySelector('[data-user-email]').textContent = user.email
        
        searchList.append( userElement )
        
        return { userElement, user }
    })
}

function handleSearch( usersRendered ) {
    $( '[data-search-input]' ).addEventListener( 'input', event => {
        value = event.target.value.toLowerCase()

        usersRendered.forEach( userRender => {
           const isUserVisible = (
               userRender.user.name.toLowerCase().match( value ) || 
               userRender.user.email.toLowerCase().match( value )
           ) 

           userRender.userElement.classList.toggle( 'hide', !isUserVisible )
        })
    })
}

(async _ => {
    const users = await getUsers()
    const usersRendered = renderUsers( users )
    
    handleSearch( usersRendered )
})()
