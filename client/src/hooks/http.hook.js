import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        //установка флага загрузки
       setLoading(true)
        try {
           //преобразование результатов запроса к типу JSON
            if (body) {
                body = JSON.stringify(body)
                //определение имени заголовков
                headers['Content-Type'] = 'application/json'
            }

            //обработка запроса
            const response = await fetch(url, {method, body, headers})
            //получение информации из запроса
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

           setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
