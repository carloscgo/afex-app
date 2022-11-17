import { axios, mapError } from './'
import { endpoints, VITE_APP } from '../constants'

const search = async (id: string) => {
  try {
    const { title, description: summary, thumbnails: { medium: { url: thumbnail } } } = await axios({
      method: endpoints.search.method,
      url: endpoints.search.path,
      params: {
        id,
        key: VITE_APP.GC_KEY,
        part: 'snippet'
      }
    }).then((response: any) => response.data.items[0].snippet)

    return {
      result: {
        id,
        title,
        summary,
        thumbnail
      }
    }
  } catch (err) {
    return {
      error: mapError(err) as string
    }
  }
}

export {
  search
}