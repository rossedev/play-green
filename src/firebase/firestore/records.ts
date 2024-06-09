import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { colRef, db } from '../config'
import { toast } from 'react-toastify'
import { Sport, TRecords } from '@/types/sports'

export const getRecords = async (userId: string) => {
  const records: TRecords[] = []
  if (!userId) {
    return []
  }

  const q = query(colRef, where('userId', '==', userId))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const data = doc.data()

    records.push({
      userId: data.userId || '',
      sportId: data.sportId || '',
      like: data.like,
      id: doc.id,
    })
  })
  return records
}

export const addRecords = async (
  newData: TRecords,
  handleChangeSports?: (newSports: Sport[]) => void,
) => {
  const newSports: any = []

  if (!newData.sportId) {
    return
  }

  addDoc(colRef, newData)
    .then(async () => {
      const sportsSaved = localStorage.getItem('sports')

      if (sportsSaved) {
        const sportsInJson = JSON.parse(sportsSaved)
        const filterSports = sportsInJson.filter(
          (sport: Sport) => sport.idSport !== newData.sportId,
        )

        if (handleChangeSports) handleChangeSports(filterSports)

        localStorage.setItem('sports', JSON.stringify(filterSports))
      }

      const q = query(colRef, where('sportId', '==', newData.sportId))
      const querySnapshot = await getDocs(q)

      if (Array.isArray(querySnapshot.docs) && querySnapshot.docs.length > 1) {
        await deleteDoc(doc(db, 'records', querySnapshot.docs[0].id))
      }
    })
    .catch((error) => {
      toast.error(`An error has occurred: ${error.message}`, {
        autoClose: 2000,
      })
    })

  return newSports
}
