import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { dataAPI } from 'src/services/dataAPI'
import InteractiveNodes from 'ui/InteractiveNodes'
import { createClient } from '@vercel/kv';

export default function OccupationNodes({ openModel }: { openModel: any }) {
  const [staff, setStaff] = useState<any>([])
  const [management, setManagement] = useState<any>([])
  const [executive, setExecutive] = useState<any>([])
  const [occList, setOccList] = useState<any>([])
  const criteriaContext = useContext(CriteriaContext)

  useEffect(() => {
    async function fetchData() {
      const staffList = await getData('Trade');
      setStaff(staffList)
      const managementList = await getData('Management')
      setManagement(managementList)
      const executiveList = await getData('Planning')
      setExecutive(executiveList)
      const occupations = await dataAPI.getOccupationsList()
      setOccList(occupations)

      async function getData(tier: string) {
        const kvClient = createClient({
          url: process.env.NEXT_PUBLIC_KV_REST_API_URL||"",
          token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN || "",
        })
        let key = 'getNodeColumnData_Transportation:' + tier
        const DbData = await kvClient.hgetall(key)
      
        if (DbData && DbData.json) {
          console.log('Getting data from DB') //To be removed in next commit
          const JsonData = JSON.parse(JSON.stringify(DbData).replaceAll('***', ' ')).json
          return JsonData
        } else {
          console.log('Getting data from API') //To be removed in next commit
          const apiData = await dataAPI.getNodeColumnData('Transportation', tier)
          await kvClient.hset(key, { json: JSON.stringify(apiData).replaceAll(' ', '***') })
          const currentDate = new Date();
          await kvClient.hset(key, { updatedon: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}` })
          return apiData
        }
      }
    }
    fetchData()
  }, [])

  const handleOccupationOnChange = (selectedItem: any) => {
    const selectedOcc = occList.filter((occTitle: any) => {
      return occTitle.name === selectedItem
    })
    let updatedOccupation: { id: string; name: string } = {
      ...criteriaContext.defaultCriteria.occupation,
      id: selectedOcc[0] !== undefined && selectedOcc[0] !== null ? selectedOcc[0].id : '47-4051.00',
      name:
        selectedOcc[0] !== undefined && selectedOcc[0] !== null
          ? selectedItem
          : 'Heavy and Tractor-Trailer Truck Drivers',
    }
    criteriaContext.setOccupation(updatedOccupation)
    openModel && openModel(true)
  }

  return (
    <div>
      <InteractiveNodes
        staff={staff}
        management={management}
        executive={executive}
        handleSelectedOcc={(item: any) => handleOccupationOnChange(item)}
        onClickToolTIp={handleOccupationOnChange}
      ></InteractiveNodes>
    </div>
  )
}
