import React from 'react'


    export function Apiresponse({ children }) {
      const [categories, setCategories] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
    
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('https://fatafatsewa.com/api/v1/categories', {
              headers: {
                'API-Key': 'pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I',
                'Content-Type': 'application/json'
              }
            })
    
            if (!response.ok) {
              throw new Error('Failed to fetch categories')
            }
    
            const data = await response.json()
            setCategories(data.categories)
            setLoading(false)
          } catch (err) {
            setError(err.message)
            setLoading(false)
          }
        }
    
        fetchCategories()
      }, []) 
    }

