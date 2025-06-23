

const url = 'https://restcountries.com/v3.1/name'

export async function findCountryByName(name: string){
    if (!name) return
    try {
        const response = await fetch(`${url}/${name}?fullText=true`)
        if (!response.ok){
            return {}
        }

        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}