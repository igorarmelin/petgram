'use client'

import photosGet, { Photo } from '@/actions/photos-get'
import FeedPhotos from './feed-photos'
import { useEffect, useRef, useState } from 'react'
import Loading from '@/components/helper/loading'
import styles from './feed.module.css'

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[]
  user?: 0 | string
}) {
  const [photosFeed, setPhotosFeed] = useState<Photo[]>(photos)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [infinite, setInfinite] = useState(photos.length < 6 ? false : true)

  const fetching = useRef(false)

  function infiniteScroll() {
    if (fetching.current) return
    fetching.current = true
    setLoading(true)

    setTimeout(() => {
      setPage((currentPage) => currentPage + 1)
      fetching.current = false
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (page === 1) return

    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        { page, total: 6, user },
        {
          cache: 'no-store',
        },
      )

      if (actionData.ok && actionData.data !== null) {
        const { data } = actionData
        setPhotosFeed((currentPhotos) => [...currentPhotos, ...data])

        if (data.length < 6) setInfinite(false)
      }
    }

    getPagePhotos(page)
  }, [page, user])

  useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', infiniteScroll)
      window.addEventListener('wheel', infiniteScroll)
    } else {
      window.removeEventListener('scroll', infiniteScroll)
      window.removeEventListener('wheel', infiniteScroll)
    }

    return () => {
      window.removeEventListener('scroll', infiniteScroll)
      window.removeEventListener('wheel', infiniteScroll)
    }
  }, [infinite])

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? (
          loading && <Loading />
        ) : (
          <p style={{ color: '#777', fontSize: '1rem' }}>
            Não há mais publicações
          </p>
        )}
      </div>
    </div>
  )
}
