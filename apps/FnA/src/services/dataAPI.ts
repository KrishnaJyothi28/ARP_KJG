import { BaseURL, careerPathRequest, jobRequest } from 'src/lib/constants'
import { getSalaryValues, getStateNMsaValues } from 'src/lib/helper'
import { Occupation, OccupationData, StateOrMsa } from 'src/lib/interface'
import occupationData from '../data/occupation.json'
import { lightcastAPI } from './lightcastAPI'
import { createClient } from '@vercel/kv'

export class dataAPI {
  static async getJobPostingCount(valueType: boolean, occData: Occupation[]) {
    let data: { id: string; title: string; count: number }[]

    if (valueType) {
      data = occData.map((item) => ({
        id: item.id,
        title: item.name,
        count: item.median_salary,
      }))
    } else {
      data = occData.map((item) => ({
        id: item.id,
        title: item.name,
        count: item.job_posting,
      }))
    }
    return data
  }

  static async getSalaryPercentile(occId: string, metaData: string[]) {
    const salaryPercentile: any = await getSalaryValues(
      BaseURL.JobPostingURL + 'distributions/salary',
      '',
      metaData,
      occId
    )

    const percentile = [25, 50, 75]

    const result = percentile.reduce((acc: any, key: any) => {
      const item = salaryPercentile.find((item: any) => item.key === key)
      acc[key] = item ? item.value : undefined

      return acc
    }, {})

    const mean =
      salaryPercentile.reduce((acc: any, item: any) => acc + item.value, 0) / Object.keys(salaryPercentile).length

    return [mean, result[25], result[50], result[75]]
  }

  static async getStateNSupply(stateOrMsaObject: StateOrMsa[]) {
    let supplyDemandRatio: number[]

    supplyDemandRatio = stateOrMsaObject.map((item: any) => item.WorkerRoleSupply / item.JobPostingsDemand)

    const data: any = stateOrMsaObject.map((item: any, index: number) => ({
      Id: item.Id,
      StateCode: item.Name,
      Value: supplyDemandRatio[index] === Infinity ? 0 : supplyDemandRatio[index],
    }))

    return data
  }

  static async getAllOccupationJobPostings(occData: Occupation[]) {
    const data: { Id: string; StateCode: string; Value: number }[] = occData.map((item) => ({
      Id: item.id,
      StateCode: item.name,
      Value: item.job_posting,
    }))
    return data
  }

  static async getDemandSupplyRatio(stateOrMsaCode: string, stateOrMsaObject: StateOrMsa[]) {
    let SupplyMin: any,
      SupplyMax: any,
      pointValue: any = 0
    ;(SupplyMin = 0), (SupplyMax = 0), (pointValue = 0)

    let supplyDemandRatio: number[]

    supplyDemandRatio = stateOrMsaObject.map((item: any) => item.WorkerRoleSupply / item.JobPostingsDemand)

    supplyDemandRatio = supplyDemandRatio.filter((value) => value !== Infinity)

    SupplyMin = Math.min(...supplyDemandRatio).toFixed(3)
    SupplyMax = Math.max(...supplyDemandRatio).toFixed(3)

    const stateOrMsaOccData: any = stateOrMsaObject.filter((item: any) => item.Id === Number(stateOrMsaCode))
    pointValue = (stateOrMsaOccData[0]?.WorkerRoleSupply / stateOrMsaOccData[0]?.JobPostingsDemand).toFixed(3)

    return [SupplyMin, SupplyMax, pointValue]
  }

  static async getOccupationsList() {
    const metadata =await dataAPI.getMetaData();
    let occupationList: { id: string; name: string; description: string; median_salary: number; job_posting: number }

    const tradeOnet = occupationData.data[0].careerpath.column1.Onet
    const managementOnet = occupationData.data[0].careerpath.column2.Onet
    const planningOnet = occupationData.data[0].careerpath.column3.Onet

    let requestBody: any = jobRequest

    const occupationOnet = tradeOnet.concat(managementOnet).concat(planningOnet)

    requestBody.filter.onet = occupationOnet
    requestBody.filter.when.end = metadata[0]
    requestBody.filter.when.start = metadata[1]
    requestBody.rank.limit = 1000
    requestBody.rank.by = 'unique_postings'
    requestBody.rank['extra_metrics'] = ['median_salary']

    let lookupRequestBody = {
      ids: occupationOnet,
    }

    const response = await lightcastAPI.postLightcastAPI(BaseURL.JobPostingURL + 'rankings/onet_name', requestBody, '')

    const occupationDescription = await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'taxonomies/onet/lookup',
      lookupRequestBody,
      ''
    )

    const mappedData = response.data.ranking.buckets.reduce((result: any, item: any) => {
      const matchingAdditionalData = occupationDescription.data.find(
        (additionalItem: any) => additionalItem.name === item.name
      )
      if (matchingAdditionalData) {
        result.push({ ...item, ...matchingAdditionalData })
      }
      return result
    }, [])

    occupationList = mappedData.map((occName: any) => ({
      id: occName.id,
      name: occName.name,
      description: occName.description,
      median_salary: occName.median_salary,
      job_posting: occName.unique_postings,
    }))
    return occupationList
  }

  static async getStateNMsaData(occ_Id: string) {
    const StateResult = await getStateNMsaValues('state', occ_Id, await this.getMetaData())
    const MsaResult = await getStateNMsaValues('msa', occ_Id, await this.getMetaData())

    return [
      {
        Occ_Id: occ_Id,
        States: StateResult,
        Msa: MsaResult,
      },
    ]
  }

  static async getOccupationDegree(occ_Id: string, metaData: string[]) {
    let jobPostingRequest = jobRequest
    jobPostingRequest.filter.when.end = metaData[0]
    jobPostingRequest.filter.when.start = metaData[1]
    jobPostingRequest.filter.onet = [occ_Id]
    const OccDegrees: any =
      (
        await lightcastAPI.postLightcastAPI(
          BaseURL.JobPostingURL + 'rankings/min_edulevels_name',
          jobPostingRequest,
          'postings:us'
        )
      ).data?.ranking?.buckets || []

    const totalUniquePostings = OccDegrees.reduce((total: any, item: any) => total + item.unique_postings, 0)
    function getDescription(name: string): string {
      const descriptionMap: { [name: string]: string } = {
        'High school or GED': 'Sub-BA Degree',
        'Associate degree': 'Sub-BA Degree',
        "Bachelor's degree": 'BA`s Degree',
        "Master's degree": 'Post-grad Degree',
        'Ph.D. or professional degree': 'Post-grad Degree',
      }
      return descriptionMap[name] || 'Unknown'
    }
    const groupedData: { [description: string]: number } = OccDegrees.reduce((groups: any, item: any) => {
      const description = getDescription(item.name)
      groups[description] = (groups[description] || 0) + item.unique_postings
      return groups
    }, {})
    const result = Object.keys(groupedData).map((description, index) => ({
      id: index,
      description,
      percentage: parseFloat(((groupedData[description] / totalUniquePostings) * 100).toFixed(1)),
    }))
    return result
  }

  static async getOccupationExperience(occId: string, metaData: string[]) {
    let jobPostingRequest = jobRequest
    jobPostingRequest.filter.when.end = metaData[0]
    jobPostingRequest.filter.when.start = metaData[1]
    jobPostingRequest.filter.onet = [occId]
    const OccDegrees: any =
      (
        await lightcastAPI.postLightcastAPI(
          BaseURL.JobPostingURL + 'rankings/min_years_experience',
          jobPostingRequest,
          'postings:us'
        )
      ).data?.ranking?.buckets || []

    const totalUniquePostings = OccDegrees.reduce((total: any, item: any) => total + item.unique_postings, 0)
    function getDescription(name: string): string {
      const descriptionMap: { [name: string]: string } = {
        '0': '0 to 2 years',
        '1': '0 to 2 years',
        '2': '0 to 2 years',
        '3': '3 to 5 years',
        '4': '3 to 5 years',
        '5': '3 to 5 years',
      }
      return descriptionMap[name] || '5+ years'
    }
    const groupedData: { [description: string]: number } = OccDegrees.reduce((groups: any, item: any) => {
      const description = getDescription(item.name)
      groups[description] = (groups[description] || 0) + item.unique_postings
      return groups
    }, {})
    const result = Object.keys(groupedData).map((description, index) => ({
      id: index,
      description,
      percentage: parseFloat(((groupedData[description] / totalUniquePostings) * 100).toFixed(1)),
    }))
    return result
  }

  static async getMetaData() {
    const metaData = await lightcastAPI.getLightcastAPI(BaseURL.JobPostingURL + 'meta', 'postings:us')
    const endDate = metaData.data.latest_day
    const [year, month, day] = endDate.split('-')
    const startYear = parseInt(year, 10) - 1
    const startDate = `${startYear}-${month}-${day}`
    return [endDate, startDate]
  }

  static async getTopCredentials(occ_Id: string, metaData: string[]): Promise<string[]> {
    let jobPostingRequest = jobRequest
    jobPostingRequest.filter.onet = [occ_Id]
    jobPostingRequest.filter.when.end = metaData[0]
    jobPostingRequest.filter.when.start = metaData[1]
    const TopSkillsNCred: any = await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'rankings/certifications_name',
      jobPostingRequest,
      'postings:us'
    )

    const creds = TopSkillsNCred.data?.ranking?.buckets || []

    return creds.reduce((acc: string[], cred: any) => {
      acc.push(cred.name)
      return acc
    }, [])
  }

  static async getSkillsAndCount(Request: any) {
    const Response: any = await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'rankings/specialized_skills_name',
      Request,
      'postings:us'
    )
    const skillsNCount = Response.data?.ranking?.buckets || []
    const SkillDict: { [name: string]: number } = skillsNCount.reduce((acc: any, item: any) => {
      acc[item.name] = item.unique_postings
      return acc
    }, {})
    return SkillDict
  }
  static async getTopEmergingSkills(occ_Id: string, metaData: string[]): Promise<string[]> {
    let CurrentYearRequest = jobRequest
    CurrentYearRequest.filter.onet = [occ_Id]
    CurrentYearRequest.filter.when.end = metaData[0]
    CurrentYearRequest.filter.when.start = metaData[1]
    CurrentYearRequest.rank.limit = 100
    const CurrentYearSkills = JSON.parse(JSON.stringify(await dataAPI.getSkillsAndCount(CurrentYearRequest)))

    let PreviousYearRequest = jobRequest
    PreviousYearRequest.filter.onet = [occ_Id]
    PreviousYearRequest.filter.when.end = CurrentYearRequest.filter.when.start
    const [year, month, day] = CurrentYearRequest.filter.when.start.split('-')
    const startYear = parseInt(year, 10) - 2
    PreviousYearRequest.filter.when.start = `${startYear}-${month}-${day}`
    PreviousYearRequest.rank.limit = 100
    const PreviousYearSkills = JSON.parse(JSON.stringify(await dataAPI.getSkillsAndCount(PreviousYearRequest)))

    const SkillDifference = Object.keys(CurrentYearSkills).reduce((output: { [name: string]: number }, key: string) => {
      const count1 = CurrentYearSkills[key]
      const count2 = PreviousYearSkills[key] || 0
      const diff = count1 - count2
      output[key] = diff
      return output
    }, {})
    const TopEmergingSkills = Object.entries(SkillDifference)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, _count]) => name)
    return TopEmergingSkills ?? []
  }

  static async getTopSpecializedSkills(occ_Id: string, metaData: string[]): Promise<string[]> {
    let jobPostingRequest = jobRequest
    jobPostingRequest.filter.onet = [occ_Id]
    jobPostingRequest.filter.when.end = metaData[0]
    jobPostingRequest.filter.when.start = metaData[1]
    const TopSplSkills: any = await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'rankings/specialized_skills_name',
      jobPostingRequest,
      'postings:us'
    )

    const skills = TopSplSkills.data?.ranking?.buckets || []

    return skills.reduce((acc: string[], skill: any) => {
      acc.push(skill.name)
      return acc
    }, [])
  }

  static async getTopJobTitles(occ_Id: string, metaData: string[]): Promise<string[]> {
    let jobPostingRequest = jobRequest
    jobPostingRequest.filter.onet = [occ_Id]
    jobPostingRequest.filter.when.end = metaData[0]
    jobPostingRequest.filter.when.start = metaData[1]
    const TopJobTitles: any = await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'rankings/title_name',
      jobPostingRequest,
      'postings:us'
    )

    const jobTitles = TopJobTitles.data?.ranking?.buckets || []

    return jobTitles.reduce((acc: string[], jobTitle: any) => {
      acc.push(jobTitle.name)
      return acc
    }, [])
  }

  static async getNodeColumnData(careerPath: string, columnName: string): Promise<any> {
    const occupationList: OccupationData = occupationData
    const careerPathData: any = occupationList.data.find((data: any) => data.careerpath.name === careerPath)
    if (!careerPathData) {
      console.error('Career path not found.')
    }
    let Onets: string[] = []
    switch (columnName) {
      case careerPathData.careerpath.column1.name:
        Onets = careerPathData.careerpath.column1.Onet
        break
      case careerPathData.careerpath.column2.name:
        Onets = careerPathData.careerpath.column2.Onet
        break
      case careerPathData.careerpath.column3.name:
        Onets = careerPathData.careerpath.column3.Onet
        break
      default:
        console.error('Invalid column name.')
    }
    const colSoc2 = new Set(Onets.map((onetCode: string) => onetCode.slice(0, 2)))
    const colSoc2Array = Array.from(colSoc2)
    const column: any[] = []
    for (const soc2 of colSoc2Array) {
      try {
        const soc2name = await dataAPI.getSOC2Name(soc2)
        const [toolTips, combinedData] = await dataAPI.getDataList(soc2, soc2name + columnName, Onets)
        const tradeObject = {
          id: soc2name + columnName,
          value: soc2name,
          tier: columnName,
          dataList: combinedData,
          toolTipData: toolTips,
        }
        column.push(tradeObject)
      } catch (error) {
        console.error(`Error occurred for digits ${soc2}:`, error)
      }
    }
    return column
  }

  static async getDataList(soc2: string, selectedSOC2withTier: string, onets: string[]): Promise<[string[], any]> {
    const occupationList: OccupationData['data'][0]['careerpath'] = occupationData.data[0].careerpath
    const allOnetsWithName: { Onet: string; Name: string }[] = []

    for (let i = 1; i <= 3; i++) {
      const column = occupationList[`column${i}` as keyof typeof occupationList] as { name: string; Onet: string[] }
      for (let j = 0; j < column.Onet.length; j++) {
        const onet = column.Onet[j]
        const name = column.name
        allOnetsWithName.push({ Onet: onet, Name: name })
      }
    }
    let nextstep: { id: string; tierName: string }[] = []
    let feeder: { id: string; tierName: string }[] = []
    let nextstepData
    let feederData
    let toolTips = []
    for (const onet of onets) {
      if (onet.startsWith(soc2)) {
        let requestBody = JSON.parse(JSON.stringify(careerPathRequest))
        requestBody.id = onet

        const nextstepResponse = await fetch('/api/lightcastapi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: `${BaseURL.careerPathURL}/onet/nextstepjobs`,
            jsonData: requestBody,
            scope: 'career-pathways',
          }),
        })
        if (!nextstepResponse.ok) {
          throw new Error('API request for nextstepjobs failed')
        }
        nextstepData = await nextstepResponse.json()
        toolTips.push(nextstepData.data?.name)

        nextstep = [
          ...nextstep,
          ...(nextstepData.data?.pathways
            ?.filter((item: any) => {
              const matchingOnetWithName = allOnetsWithName.find((onetWithName) => onetWithName.Onet === item.id)
              return matchingOnetWithName !== undefined
            })
            .map((item: any) => {
              const matchingOnetWithName = allOnetsWithName.find((onetWithName) => onetWithName.Onet === item.id)
              return { ...item, tierName: matchingOnetWithName?.Name }
            }) || []),
        ]
        // Call Feeder jobs
        const feederResponse = await fetch('/api/lightcastapi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: `${BaseURL.careerPathURL}/onet/feederjobs`,
            jsonData: requestBody,
            scope: 'career-pathways',
          }),
        })
        if (!nextstepResponse.ok) {
          throw new Error('API request for feederjobs failed')
        }
        feederData = await feederResponse.json()
        feeder = [
          ...feeder,
          ...(feederData.data?.pathways
            ?.filter((item: any) => {
              const matchingOnetWithName = allOnetsWithName.find((onetWithName) => onetWithName.Onet === item.id)
              return matchingOnetWithName !== undefined
            })
            .map((item: any) => {
              const matchingOnetWithName = allOnetsWithName.find((onetWithName) => onetWithName.Onet === item.id)
              return { ...item, tierName: matchingOnetWithName?.Name }
            }) || []),
        ]
      }
    }

    type SOC2Type = { [key: string]: Set<string> }
    const nextstepSOC2: SOC2Type = nextstep.reduce((acc, item) => {
      const firstTwoDigits = item.id.slice(0, 2)
      if (!acc[firstTwoDigits]) {
        acc[firstTwoDigits] = new Set()
      }
      acc[firstTwoDigits].add(item.tierName)
      return acc
    }, {} as SOC2Type) // Specify the type explicitly here

    const nextstepSOC2Array = Object.entries(nextstepSOC2).map(([firstTwoDigits, tierNames]) => ({
      firstTwoDigits: firstTwoDigits,
      tierNames: Array.from(tierNames),
    }))

    const feederSOC2: SOC2Type = feeder.reduce((acc, item) => {
      const firstTwoDigits = item.id.slice(0, 2)
      if (!acc[firstTwoDigits]) {
        acc[firstTwoDigits] = new Set()
      }
      acc[firstTwoDigits].add(item.tierName)
      return acc
    }, {} as SOC2Type)

    const feederSOC2Array = Object.entries(feederSOC2).map(([firstTwoDigits, tierNames]) => ({
      firstTwoDigits: firstTwoDigits,
      tierNames: Array.from(tierNames),
    }))

    let i = 1
    const toData = []
    for (const soc2Item of nextstepSOC2Array) {
      const soc2 = soc2Item.firstTwoDigits
      const soc2Name = await dataAPI.getSOC2Name(soc2)
      for (const tier of soc2Item.tierNames) {
        toData.push({
          id: i,
          toolTipData: '',
          fromData: selectedSOC2withTier,
          toData: `${soc2Name?.toString() ?? ''}${tier as string}`,
        })
        i++
      }
    }
    const fromData = []
    for (const soc2Item of feederSOC2Array) {
      const soc2 = soc2Item.firstTwoDigits
      const soc2Name = await dataAPI.getSOC2Name(soc2)
      for (const tier of soc2Item.tierNames) {
        fromData.push({
          id: i,
          toolTipData: '',
          fromData: `${soc2Name?.toString() ?? ''}${tier as string}`,
          toData: selectedSOC2withTier,
        })
        i++
      }
    }
    const combinedData = toData.concat(fromData) // Merge toData and fromData into a single array
    return [toolTips, combinedData] // Resolve the promise with the combined array
  }

  static async getSOC2Name(soc2: string): Promise<string | undefined> {
    try {
      const payload = {
        ids: [`${soc2}-0000`],
      }
      const soc2Name = await lightcastAPI.postLightcastAPI(
        BaseURL.JobPostingURL + '/taxonomies/soc2/lookup',
        payload,
        'postings:us'
      )
      const name = soc2Name.data[0]?.name
      return name
    } catch (error) {
      console.error(`Error occurred for digits ${soc2}:`, error)
      return undefined
    }
  }
}
