export type GroupCardTypeRaw = {
  groupNumber: string
  points: number
}

export const fetchGroups = async () => {
  console.log('Fetching Data')
  try {
    const fetchedGroups: GroupCardTypeRaw[] = [
      { groupNumber: '1', points: 120 },
      { groupNumber: '2', points: 23 },
      { groupNumber: '3', points: 13 },
      { groupNumber: '4', points: 56 },
      { groupNumber: '5', points: 78 },
    ]

    const promises = fetchedGroups.map(async (group) => {
      const response = await fetch(`https://json-server-amber-nine.vercel.app/shops?group=${group.groupNumber}`)
      const data = await response.json()
      const shopData = data[0]
      return { name: shopData.name, points: group.points }
    })

    const resolvedGroups = await Promise.all(promises)
    localStorage.setItem('groups', JSON.stringify(resolvedGroups.sort((a, b) => b.points - a.points)))
  } catch (error) {
    console.log(error)
  }
  setTimeout(fetchGroups, 200000)
}
